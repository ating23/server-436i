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
  friends: FacebookAccountsSchema["id"][];
  groups: FacebookGroupsSchema["id"][];
  likes: FacebookLikesSchema["id"][];
  music: FacebookMusicSchema["id"][];
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
  artists: SpotifyArtistsSchema["id"][];
  tracks: SpotifyTracksSchema["id"][];
}

interface AuthAccountSchema {
  email: string;
  password: string;
}

interface AccountSchema {
  id: number;
  name: string;
  auth: AuthAccountSchema;
  facebook: FacebookAccountSchema;
  instagram: InstagramAccountSchema;
  spotify: SpotifyAccountSchema;
}