import RadioChannelList from "model/radioList";
import "./Title.css";
import { parseTitle } from "api/parseTitle";
import { useEffect, useState } from "react";
import RadioChannel from "model/radioChannel";
import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  radioChannelIndex: number;
  currentChen: RadioChannel | null;
}

const TitleBox = ({ radioChannelIndex, currentChen }: Props) => {
  const [radioProgramTitle, setRadioProgramTitle] =
    useState("리스트에서 선택하세요");

  const loadTitle = async () => {
    try {
      if (currentChen.radioType === "CBS") {
        await CBSM.WSDL.CBSMService.BindOnairList(async (data: any) => {
          // console.log(data);
          let res =
            RadioChannelList.radioList.indexOf(currentChen) === 8
              ? data[2]["Name"]
              : data[1]["Name"];
          setRadioProgramTitle(res);
        });
      } else {
        var titletext = await parseTitle(currentChen!);
        setRadioProgramTitle(titletext);
        // console.log(titletext);
      }
    } catch (error) {
      setRadioProgramTitle("제목 로딩 실패");
    }
  };

  useEffect(() => {
    // console.log(currentChen);
    if (radioChannelIndex >= 0) {
      setRadioProgramTitle("제목 로딩중...");
      loadTitle();
      const timer = setInterval(() => {
        loadTitle();
      }, 10000); // 5000ms = 5초

      return () => {
        // 컴포넌트가 언마운트될 때 실행되는 함수
        clearInterval(timer); // 타이머 정리
        // console.log("sec정리됨!");
      };
    }
  }, [currentChen]);

  // console.log(RadioChannelList.radioList[0]);
  return (
    <div
      className="TitleBox"
      style={{
        background: `rgba(0,0,0,0.45) url(${require("imgs/title.png")})`,
        backgroundBlendMode: "darken",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* <img src={require("imgs/title.png")} alt="예시 이미지" /> */}
      <Helmet>
        <title>
          {currentChen
            ? `${radioProgramTitle} - ${currentChen.radioChannelTitle}`
            : "webRadio Version 1.0.6"}
        </title>
      </Helmet>

      <div className="radio-title">{radioProgramTitle}</div>
      <div className="radio-infos">
        <div className="radio-station">
          {currentChen ? currentChen.radioChannelTitle : "방송국"}
        </div>
        <div
          className="radio-freq"
          style={{
            color: currentChen ? currentChen.highlightColor.value : "aliceblue",
          }}
        >
          {currentChen ? currentChen.radioFreq : "주파수"}
        </div>
      </div>
    </div>
  );
};

export default TitleBox;
