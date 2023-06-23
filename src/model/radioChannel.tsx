interface RadioChannel {
  radioChannelTitle: string;
  radioFreq: string;
  radioType: string;
  radioWebSlug: string;
  radioHlsSlug?: string;
  radioApiSlug?: string | null;
  highlightColor: Color;
}

interface Color {
  // Define your Color properties here based on your requirements
  value: string;
}

export default RadioChannel;
