const accountId = res.locals.token.id

const { service, accessToken, expiresIn, refreshToken } = req.body
Logger.Log(service, accessToken, expiresIn, refreshToken)

export default async function getSpotifyUserData(): Promise<void> {
  try {
    const spotifyUserData: SpotifyUserInterface = await getSpotifyUser(accountId, accessToken);
    const spotifyArtistData: SpotifyArtistInterface = await getTopArtists(accountId, accessToken);
    const spotifyTracksData: SpotifyTracksInterface = await getTopTracks(accountId, accessToken);
    if (validateSpotifyData(spotifyUserData, spotifyArtistData, spotifyTracksData)) {
      // const x: UserSpotifyDataDocument = generateDbItem(accountId, spotifyUserData, spotifyArtistData, spotifyTracksData)
      try {
        // await writeToDB(x);
        res.status(204).send({})
      } catch (e) {
        res.status(400).send("Failed to write to DB");
      }
    }
    return
  } catch (e) {
    if (e.message === "Response from Spotify API was empty.") {
      next(SpotifyEmptyResultError)
    } else if (e.message === "Spotify API returned 500, it may be down.") {
      console.log("caught the malformed accessToken hereb");
      next(SpotifyServiceDownError)
    } else if (e.message === "Spotify Bearer Token expired or invalid") {
      next (SpotifyBearerTokenError)
    } else {
      res.status(400).send(e);
    }
    return
  }
}