// https://developer.spotify.com/documentation/general/guides/scopes/

export const spotifyScope = [
  // Read access to the list of artists and other users that the user follows.
 "user-follow-read",
  // Read access to a user’s recently played tracks.
  "user-read-recently-played",
  // Read access to a user's "Your Music" library.
  "user-library-read",
  // Read access to a user’s player state.
  "user-read-playback-state",
  // Read access to a user’s currently playing content.
  "user-read-currently-playing",
  // Write access to a user’s playback state
  "user-modify-playback-state",
  // Include collaborative playlists when requesting a user's playlists.
  "playlist-read-collaborative",
  // Read access to user’s email address.
  "user-read-email",
  // Read access to user's private playlists.
  "playlist-read-private",
  // Read access to a user's top artists and tracks.
  "user-top-read",
].toString ()