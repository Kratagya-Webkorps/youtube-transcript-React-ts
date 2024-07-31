
export interface CaptionProp {
  start: string;
  dur: string;
  text: string;
}

export interface VideoCardProps {
  thumbnail: string;
  title: string;
  channelTitle: string;
  duration: string;
  captions: CaptionProp[];
  inputValue: string;
  videoID: string;
}
