import axios from "axios";
import RadioChannel from "model/radioChannel";
import RadioChannelList from "model/radioList";

export async function parseTitle(radio: RadioChannel): Promise<string> {
  let titleText = "리스트에서 선택해주세요";
  let response;

  switch (radio.radioType) {
    case "SBS":
      response = await axios.get(radio.radioApiSlug!);
      if (response.status === 200) {
        const jObject = response.data;
        titleText = jObject["onair"]["info"]["title"].toString();
      }
      break;

    case "KBS":
      // response = await axios.get(
      //   "http://static.api.kbs.co.kr/mediafactory/v1/schedule/onair_now?rtype=jsonp&channel_code=21,22,24,25&local_station_code=00&callback=getChannelInfoList"
      // );
      response = await axios.get(
        "http://static.api.kbs.co.kr/mediafactory/v1/schedule/onair_now?rtype=jsonp&channel_code=21,22,24,25&local_station_code=00&callback=getChannelInfoList"
      );

      if (response.status === 200) {
        let jsonText = response.data;
        jsonText = jsonText.substring(
          jsonText.indexOf("(") + 1,
          jsonText.indexOf(");")
        );
        const jObject = JSON.parse(jsonText);
        titleText =
          jObject[RadioChannelList.radioList.indexOf(radio)]["schedules"][0][
            "program_title"
          ].toString();
      }
      break;

    case "MBC":
      const url =
        RadioChannelList.radioList.indexOf(radio) === 4
          ? "http://control.imbc.com/Schedule/Radio/Time?sType=FM"
          : "http://control.imbc.com/Schedule/Radio/Time?sType=FM4U";
      response = await axios.get(url);
      // console.log(response);

      const jObject = response.data;
      titleText = jObject[0]["Title"].toString();
      break;

    case "CBS":
      const cbsUrl =
        RadioChannelList.radioList.indexOf(radio) === 8
          ? "https://cb05-1-225-65-39.ngrok-free.app/http://www.cbs.co.kr/cbsplayer/rainbow/widget/timetable.asp?ch=2"
          : "https://cb05-1-225-65-39.ngrok-free.app/http://www.cbs.co.kr/cbsplayer/rainbow/widget/timetable.asp?ch=4";
      response = await axios.get(cbsUrl, {
        headers: {
          "ngrok-skip-browser-warning": "any",
          // "Content-Type": "text/html; Charset=ks_c_5601-1987"
        },
      });
      const aspText = response.data; // Buffer.from(response.data, "binary").toString("cp949");
      const arrTimeTable: TimeTableFromTBS[] = [];

      const lines = aspText.trim().split("\n");

      for (const line of lines) {
        const item = line.split("\t");
        arrTimeTable.push(
          new TimeTableFromTBS(
            item[0],
            item[1],
            item[2],
            item[3],
            item[4],
            item[5],
            item[6],
            item[7],
            item[8],
            item[9],
            item[10]
          )
        );
      }

      const curSec =
        new Date().getHours() * 3600 +
        new Date().getMinutes() * 60 +
        new Date().getSeconds();

      for (let i = arrTimeTable.length - 1; i >= 0; i--) {
        if (parseInt(arrTimeTable[i].startTime!) < curSec) {
          titleText = arrTimeTable[i].name!;
          break;
        }
      }
      break;

    case "TBS":
      response = await axios.get(radio.radioWebSlug!, {
        headers: {
          "ngrok-skip-browser-warning": "any",
          // "Content-Type": "application/json;charset=UTF-8",
          // "User-Agent":
          //   "Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
        },
      });

      if (response.status === 200) {
        const title = response.data.substring(
          response.data.indexOf('class="tit">') + 'class="tit">'.length
        );
        titleText = title.substring(0, title.indexOf("</"));
      }
      break;

    case "EBS":
      response = await axios.get(
        "https://cb05-1-225-65-39.ngrok-free.app/https://www.ebs.co.kr/onair/cururentOnair.json?channelCd=RADIO",
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
            // "Content-Type": "application/json;charset=UTF-8",
            // "User-Agent":
            //   "Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
          },
        }
      );

      if (response.status === 200) {
        const jsonText = response.data.nowProgram.title;
        // console.log(jsonText);
        // const jObject = JSON.parse(jsonText)["nowProgram"];
        titleText = jsonText;
      }
      break;
  }

  return titleText;
}

class TimeTableFromTBS {
  startTime: string | undefined;
  endTime: string | undefined;
  pgm: string | undefined;
  name: string | undefined;
  img: string | undefined;
  homepage: string | undefined;
  show: string | undefined;
  board: string | undefined;
  multi: string | undefined;
  mc: string | undefined;
  burl: string | undefined;

  constructor(
    startTime: string | undefined,
    endTime: string | undefined,
    pgm: string | undefined,
    name: string | undefined,
    img: string | undefined,
    homepage: string | undefined,
    show: string | undefined,
    board: string | undefined,
    multi: string | undefined,
    mc: string | undefined,
    burl: string | undefined
  ) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.pgm = pgm;
    this.name = name;
    this.img = img;
    this.homepage = homepage;
    this.show = show;
    this.board = board;
    this.multi = multi;
    this.mc = mc;
    this.burl = burl;
  }
}
