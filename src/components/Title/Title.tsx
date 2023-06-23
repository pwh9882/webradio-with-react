import RadioChannelList from "model/radioList";
import "./Title.css";
import { parseTitle } from "api/parseTitle";
import { useEffect, useState } from "react";
import RadioChannel from "model/radioChannel";

interface Props {
  radioChannelIndex: number;
  currentChen: RadioChannel | null;
}

const TitleBox = ({ radioChannelIndex, currentChen }: Props) => {
  const [radioProgramTitle, setRadioProgramTitle] = useState("선택하세요");

  const loadTitle = async () => {
    var titletext = await parseTitle(currentChen!);
    setRadioProgramTitle(titletext);
    console.log(titletext);
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
        background: `rgba(0,0,0,0.4) url(${require("imgs/title.png")})`,
        backgroundBlendMode: "darken",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <img src={require("imgs/title.png")} alt="예시 이미지" /> */}

      <div className="radio-title">{radioProgramTitle}</div>
      <div className="radio-infos">
        <div className="radio-station">
          {currentChen ? currentChen.radioChannelTitle : "방송국"}
        </div>
        <div className="radio-freq">
          {currentChen ? currentChen.radioFreq : "주파수"}
        </div>
      </div>
    </div>
  );
};

export default TitleBox;
