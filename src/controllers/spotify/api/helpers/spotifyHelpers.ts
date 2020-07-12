import { ArtistInterface, SpotifyArtistInterface, TrackInterface } from "../types/spotifyTypes";

export function generateArtistItem (artist: Record<string, any>): ArtistInterface {
  const artistItem: ArtistInterface = {
    artistName: artist.name,
    "spotify_uuid": artist.id,
    href: artist.href,
    images: artist.images
  }
  return artistItem;
}

export function generateSpotifyArtistInterface(accountId: string, artists: Array<ArtistInterface>, genres: Array<string>): SpotifyArtistInterface {
  const ret: SpotifyArtistInterface = {
    accountId: accountId,
    artists: artists,
    genres: genres
  }
  return ret;
}

export function generateTrackItem(track: Record<string, any>, artists: Array<ArtistInterface>): TrackInterface {
  const ret: TrackInterface = {
    artists: artists,
    "spotify_uuid": track.id,
    "song_name": track.name,
    href: track.href,
    "preview_url": track.preview_url,
    uri: track.uri
  }
  return ret;
}