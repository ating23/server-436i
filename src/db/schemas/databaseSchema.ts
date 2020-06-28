interface FacebookAccountsSchema {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  birthday: Date;
  hometown: string;
  languages: string[];
  refs: number;
}

interface FacebookGroupsSchema {
  id: number;
  refs: number;
}

interface FacebookLikesSchema {
  id: number;
  refs: number;
}

interface FacebookMusicSchema {
  id: number;
  refs: number;
}

interface SpotifyArtistsSchema {
  id: number;
  name: string;
  images: string[];
  popularity: number;
  genres: string[];
  refs: number;
}

interface SpotifyAlbumSchema {
  name: string;
  releaseDate: string;
  images: string[];
}

interface SpotifyTracksSchema {
  id: number;
  name: string;
  popularity: number;
  album: SpotifyAlbumSchema;
  artists: SpotifyArtistsSchema["id"][];
  duration: number;
  externalIds: string[];
  externalURLs: string[];
  refs: number;
}

// ---

interface FacebookAccountSchema {
  accessToken: string;
  refreshToken: string;
  friends: string[];
  groups: string[];
  likes: string[];
  music: string[];
}

interface InstagramAccountSchema {
  accessToken: string;
  refreshToken: string;
}

interface SpotifyAccountSchema {
  accessToken: string;
  refreshToken: string;
  displayName: string;
  images: string[];
  country: string;
  artists: string[];
  tracks: string[];
}