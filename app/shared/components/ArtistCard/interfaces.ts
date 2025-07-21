export interface Artist {
  imageSrc: string;
  name: string;
}

export interface ArtistCardProps {
  artist1?: Artist;
  artist2?: Artist;
  artist3?: Artist;
  artist4?: Artist;
  artist5?: Artist;
  artist6?: Artist;
  artists: Artist[];
}
