import { AxiosResponse } from "axios"

export interface SpotifyImageData {
  height: number;
  width: number;
  url: string;
}

/**
 * @Axios Responses
 */
export interface SpotifyUserDataResponse {
  country: string;
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  id: string;
  images: SpotifyImageData[];
}

export interface SpotifyUserResponse extends AxiosResponse {
  data: SpotifyUserDataResponse;
}

export interface SpotifyArtistsDataResponse {
  items: {
    external_urls: {
      spotify: string;
    };
    followers: {
      total: number;
    };
    genres: string[];
    id: string;
    images: SpotifyImageData[];
    name: string;
    popularity: number;
  }[];
}

export interface SpotifyArtistsResponse extends AxiosResponse {
  data: SpotifyArtistsDataResponse;
}

export interface SpotifyTracksDataResponse {
  items: {
    external_urls: {
      spotify: string;
    };
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      id: string;
      name: string;
    }[];
    album: {
      external_urls: {
        spotify: string;
      };
      id: string;
      images: SpotifyImageData[];
      name: string;
    };
  }[];
}

export interface SpotifyTracksResponse extends AxiosResponse {
  data: SpotifyTracksDataResponse;
}

/**
 * @Spotify Data
 */
export interface SpotifyUserData {
  spotifyId: string;
  displayName: string;
  email: string;
  url: string;
  followers: number;
  images: SpotifyImageData[];
  country: string;
}

export interface SpotifyArtistsData {
  spotifyId: string;
  name: string;
  popularity: number;
  followers: number;
  genres: string[];
  images: SpotifyImageData[];
  url: string;
}

export interface SpotifyTracksData {
  spotifyId: string;
  name: string;
  popularity: number;
  images: SpotifyImageData[];
  audioPreviewURL: string;
  url: string;
}