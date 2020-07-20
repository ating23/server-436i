export interface ArtistInterface {
  artistName: string;
  spotify_uuid: string;
  href: string;
  images: Array<Record<string, any>>;
}

export interface SpotifyArtistInterface {
  accountId: string;
  artists: Array<ArtistInterface>;
  genres: Array<string>;
}

export interface SpotifyUserInterface {
  accountId: string;
  displayName: string;
  uri: string;
  href: string;
  images: Array<Record<string,any>>;
}

export interface TrackInterface {
  spotify_uuid: string;
  artists: Array<ArtistInterface>;
  song_name: string;
  href: string;
  preview_url: string;
  uri: string;
}

export interface SpotifyTracksInterface {
  accountId: string;
  tracks: Array<TrackInterface>;
}