export interface ChartItem {
  id: number;
  imageSrc: string;
  title: string;
  artistName: string;
  plays: number;
  duration: string;
  albumName: string;
}

export interface ChartPageProps {
  data?: ChartItem[];
}
