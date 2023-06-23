import axios, { AxiosResponse } from "axios";
import RadioChannel from "model/radioChannel";

async function parseHlsSlugFromApiSlug(radio: RadioChannel): Promise<string> {
  let hlsSlug = "";
  const dio = axios.create();

  try {
    const response: AxiosResponse = await dio.get(radio.radioApiSlug!);
    const jsonText = response.data;

    switch (radio.radioType) {
      case "SBS":
        hlsSlug = jsonText["onair"]["source"]["mediasource"]["mediaurl"];
        break;

      case "KBS":
        hlsSlug = jsonText["channel_item"][0]["service_url"];
        break;

      case "MBC":
        hlsSlug = jsonText;
        break;
    }
  } catch (error) {
    console.log(`오류 발생: ${error}`);
  }

  return hlsSlug;
}
