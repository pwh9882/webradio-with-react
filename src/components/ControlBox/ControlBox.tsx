import { MouseEventHandler } from "react";
import "./ControlBox.css";
import Ripples from "react-ripples";
interface Props {
  onPlayClick: Function;
  isPlaying: boolean;
}

const ControlBox = ({ onPlayClick, isPlaying }: Props) => {
  return (
    <div
      className="ControlBox"
      style={{
        background: `rgba(0,0,0,0.45) url(${require("imgs/play5.png")})`,
        backgroundBlendMode: "darken",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Ripples
        className={`play-pause-btn ${!isPlaying ? "playing" : ""}`}
        onClick={(e) => {
          var posX = e.pageX;
          var posY = e.pageY;

          onPlayClick();
        }}
      >
        {/* {isPlaying ? "▶︎" : "►"} */}
      </Ripples>
    </div>
  );
};

export default ControlBox;
