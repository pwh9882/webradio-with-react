import TitleBox from "components/Title/Title";
import "./Screen.css";
import RadioList from "components/RadioList/RadioList";
import ContorlBox from "components/ControlBox/ControlBox";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import RadioChannelList from "model/radioList";
import RadioChannel from "model/radioChannel";
const Screen = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [radioChannelIndex, setRadioChennelIndex] = useState(-1);
  // let selectedRadioHlsSlug = "";
  const [selectedRadioHlsSlug, setSelectedRadioHlsSlug] = useState<string>("");
  const [urlForPlayer, setUrlForPlayer] = useState<string>("");
  const [selectedRadio, SetSelectedRadio] = useState<RadioChannel | null>(null);

  const onSelectRadioChannel = (index: number) => {
    setRadioChennelIndex(index);
    // console.log(RadioChannelList.radioList[index]);
  };

  const onPlayClick = async () => {
    if (urlForPlayer === "") {
      await loadHlsSlug();
      setUrlForPlayer(selectedRadioHlsSlug);
    } else {
      setUrlForPlayer("");
    }
  };

  const loadHlsSlug = async () => {
    if (radioChannelIndex === -1) return;
    if (
      RadioChannelList.radioList[radioChannelIndex].radioHlsSlug === undefined
    ) {
      parseHlsSlugFromApiSlug(RadioChannelList.radioList[radioChannelIndex]);
    } else {
      // selectedRadioHlsSlug = selectedRadio!.radioHlsSlug;
      setSelectedRadioHlsSlug(
        RadioChannelList.radioList[radioChannelIndex].radioHlsSlug!
      );
    }
    SetSelectedRadio(RadioChannelList.radioList[radioChannelIndex]);
  };

  const parseHlsSlugFromApiSlug = async (selectedRadio: RadioChannel) => {
    let hlsSlug = "";
    // console.log(selectedRadio!.radioApiSlug);

    if (selectedRadio!.radioType === "MBC") {
      const data = await fetch(selectedRadio!.radioApiSlug!, {
        headers: { "ngrok-skip-browser-warning": "any" },
      }).then((response) => {
        // console.log(response);
        return response;
      });
      hlsSlug = await data
        .body!.getReader()
        .read()
        .then((data) => String.fromCharCode(...data.value!));
    } else if (selectedRadio!.radioType === "KBS") {
      const data = await fetch(selectedRadio!.radioApiSlug!, {}).then(
        (response) => {
          // console.log(response);
          return response.json();
        }
      );
      hlsSlug = data.channel_item[0].service_url;
    } else if (selectedRadio!.radioType === "SBS") {
      const data = await fetch(selectedRadio!.radioApiSlug!, {}).then(
        (response) => {
          // console.log(response);
          return response.json();
        }
      );
      hlsSlug = data.onair.source.mediasource.mediaurl;
    }

    // console.log(hlsSlug);
    // selectedRadioHlsSlug = hlsSlug;
    setSelectedRadioHlsSlug(hlsSlug);
  };

  useEffect(() => {
    loadHlsSlug();
  }, [radioChannelIndex]);

  useEffect(() => {
    setUrlForPlayer(selectedRadioHlsSlug);
  }, [selectedRadioHlsSlug]);

  return (
    <div className="Screen">
      <TitleBox
        radioChannelIndex={radioChannelIndex}
        currentChen={selectedRadio}
      />
      <RadioList callback={onSelectRadioChannel} />
      <ContorlBox onPlayClick={onPlayClick} isPlaying={urlForPlayer === ""} />
      {radioChannelIndex >= 0 && (
        <ReactPlayer
          ref={playerRef}
          className="react-player"
          url={urlForPlayer} // 플레이어 url
          width="" // 플레이어 크기 (가로)
          height="100px" // 플레이어 크기 (세로)
          playing={true} // 자동 재생 on
          muted={false} // 자동 재생 on
          controls={true} // 플레이어 컨트롤 노출 여부
          light={false} // 플레이어 모드
          pip={true} // pip 모드 설정 여부
          poster={""} // 플레이어 초기 포스터 사진
          onEnded={() => {}} // 플레이어 끝났을 때 이벤트
          style={{ display: "none" }}
        />
      )}
    </div>
  );
};

export default Screen;
