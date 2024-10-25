import RadioChannel from "./radioChannel";

class RadioChannelList {
  static radioList: RadioChannel[] = [
    {
      radioChannelTitle: "KBS 제1라디오",
      radioType: "KBS",
      radioFreq: "FM 97.3㎒",
      radioWebSlug:
        "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=21#refresh",
      radioApiSlug:
        "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/21/",
      highlightColor: { value: "#eb3b5a" },
    },
    {
      radioChannelTitle: "KBS 제2라디오",
      radioType: "KBS",
      radioFreq: "FM 106.1㎒",
      radioWebSlug:
        "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=22#refresh",
      radioApiSlug:
        "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/22/",
      highlightColor: { value: "#fa8231" },
    },
    {
      radioChannelTitle: "KBS 1FM",
      radioType: "KBS",
      radioFreq: "FM 93.1㎒",
      radioWebSlug:
        "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=24#refresh",
      radioApiSlug:
        "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/24/",
      highlightColor: { value: "#f7b731" },
    },
    {
      radioChannelTitle: "KBS 2FM",
      radioType: "KBS",
      radioFreq: "FM 89.1㎒",
      radioWebSlug:
        "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=25#refresh",
      radioApiSlug:
        "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/25/",
      highlightColor: { value: "#20bf6b" },
    },
    {
      radioChannelTitle: "MBC 라디오",
      radioType: "MBC",
      radioFreq: "FM 95.9㎒",
      radioWebSlug: "https://mini.imbc.com/webapp_v3/mini.html?channel=sfm",
      radioApiSlug:
        "https://normalize.duckdns.org/proxy/?url=https%3A%2F%2Fsminiplay.imbc.com%2Faacplay.ashx%3Fagent%3Dwebapp%26channel%3Dsfm",
      highlightColor: { value: "#00b061" },
    },
    {
      radioChannelTitle: "MBC FM4U",
      radioType: "MBC",
      radioFreq: "FM 91.9㎒",
      radioWebSlug: "https://mini.imbc.com/webapp_v3/mini.html?channel=mfm",
      radioApiSlug:
        "https://normalize.duckdns.org/proxy/?url=https%3A%2F%2Fsminiplay.imbc.com%2Faacplay.ashx%3Fagent%3Dwebapp%26channel%3Dmfm",
      highlightColor: { value: "#0fb9b1" },
    },
    {
      radioChannelTitle: "SBS 러브FM",
      radioType: "SBS",
      radioFreq: "FM 103.5㎒",
      radioWebSlug: "https://play.sbs.co.kr/onair/pc/index.html?id=S08",
      radioApiSlug:
        "https://apis.sbs.co.kr/play-api/1.0/onair/channel/S08?protocol=hls",
      highlightColor: { value: "#2d98da" },
    },
    {
      radioChannelTitle: "SBS 파워FM",
      radioType: "SBS",
      radioFreq: "FM 107.7㎒",
      radioWebSlug: "https://play.sbs.co.kr/onair/pc/index.html?id=S07",
      radioApiSlug:
        "https://apis.sbs.co.kr/play-api/1.0/onair/channel/S07?protocol=hls",
      highlightColor: { value: "#3867d6" },
    },
    {
      radioChannelTitle: "CBS 음악FM",
      radioType: "CBS",
      radioFreq: "FM 93.9㎒",
      radioWebSlug:
        "https://normalize.duckdns.org/proxy/?url=https%3A%2F%2Fwww.cbs.co.kr%2Fschedule%3Ftype%3DmusicFm",
      radioHlsSlug:
        "https://m-aac.cbs.co.kr/mweb_cbs939/_definst_/cbs939.stream/playlist.m3u8",
      radioApiSlug: null,
      highlightColor: { value: "#8854d0" },
    },
    {
      radioChannelTitle: "CBS 표준FM",
      radioType: "CBS",
      radioFreq: "FM 98.1㎒",
      radioWebSlug:
        "https://normalize.duckdns.org/proxy/?url=https%3A%2F%2Fwww.cbs.co.kr%2Fschedule%3Ftype%3Dfm",
      radioHlsSlug:
        "https://m-aac.cbs.co.kr/mweb_cbs981/_definst_/cbs981.stream/playlist.m3u8",
      radioApiSlug: null,
      highlightColor: { value: "#4a3a95" },
    },
    {
      radioChannelTitle: "TBS 교통방송",
      radioType: "TBS",
      radioFreq: "FM 95.1㎒",
      radioWebSlug:
        "https://normalize.duckdns.org/proxy/?url=http://tbs.seoul.kr/player/live.do?channelCode=CH_A",
      radioHlsSlug:
        "https://cdnfm.tbs.seoul.kr/tbs/_definst_/tbs_fm_web_360.smil/playlist.m3u8",

      radioApiSlug: null,
      highlightColor: { value: "#4b6584" },
    },
    {
      radioChannelTitle: "EBS FM 교육방송",
      radioType: "EBS",
      radioFreq: "FM 104.5㎒",
      radioWebSlug: "https://www.ebs.co.kr/radio/home?mainTop",
      radioHlsSlug:
        "https://ebsonair.ebs.co.kr/fmradiofamilypc/familypc1m/playlist.m3u8",
      radioApiSlug: null,
      highlightColor: { value: "#394454" },
    },
  ];
}

export default RadioChannelList;
