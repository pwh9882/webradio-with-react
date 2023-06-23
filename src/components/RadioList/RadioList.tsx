import RadioChannelList from "model/radioList";
import "./RadioList.css";
import { useState } from "react";
import Ripples from "react-ripples";

interface Props {
  callback: Function;
}
const RadioList = ({ callback }: Props) => {
  const [currIndex, setCurrIndex] = useState(-1);
  const onRadioChannelClick = (index: number) => {
    callback(index);
    setCurrIndex(index);
  };

  // console.log(a);

  return (
    <div className="RadioList">
      <div>
        {RadioChannelList.radioList.map((radioChannel, index) => {
          return (
            <Ripples>
              <div
                className="material-ripple radioChannel"
                key={index}
                onClick={() => onRadioChannelClick(index)}
                style={{
                  backgroundColor: radioChannel.highlightColor.value,
                  opacity: index === currIndex ? "40%" : "100%",
                }}
              >
                <span>{radioChannel.radioChannelTitle}</span>
                <span>{radioChannel.radioFreq}</span>
              </div>
            </Ripples>
          );
        })}
      </div>
    </div>
  );
};

export default RadioList;
