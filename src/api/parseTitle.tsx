import axios from "axios";
import { load } from "cheerio";

import RadioChannel from "model/radioChannel";
import RadioChannelList from "model/radioList";
// import CBSMService from "../../ajax";

export async function parseTitle(radio: RadioChannel): Promise<string> {
  let titleText = "리스트에서 선택해주세요";
  let response;
  let url;
  // console.log(radio.radioType);

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
        "https://static.api.kbs.co.kr/mediafactory/v1/schedule/onair_now?rtype=jsonp&channel_code=21,22,24,25&local_station_code=00&callback=getChannelInfoList"
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
      url =
        RadioChannelList.radioList.indexOf(radio) === 4
          ? "https://control.imbc.com/Schedule/Radio/Time?sType=FM"
          : "https://control.imbc.com/Schedule/Radio/Time?sType=FM4U";
      response = await axios.get(url);
      // console.log(response);

      const jObject = response.data;
      titleText = jObject[0]["Title"].toString();
      break;

    case "CBS":
      url = radio.radioWebSlug;
      response = await axios.get(url);

      // cheerio로 HTML 파싱
      const $ = load(response.data);

      // li.on의 자식 중 클래스가 program인 요소 텍스트 가져오기
      titleText = $("li.on .program").text().trim();

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
        "https://normalize.duckdns.org/proxy/?url=https%3A%2F%2Fwww.ebs.co.kr%2Fonair%2FcururentOnair.json%3FchannelCd%3DRADIO"
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
