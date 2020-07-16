import Route from "../types/Route"
import { MethodTypes } from "../types/MethodTypes"

const { PORT } = process.env || 5000

export const DEV_BASE_URL = `http://localhost:${PORT}`
export const PROD_BASE_URL = "https://api.educonnections.ca"

export const apiRoute = "/"

/**
 * @Session Routes
 */
export const sessionRoutes = "/session"

export const verifySessionRoute = new Route(MethodTypes.POST, sessionRoutes, "/verify")

/**
 * @Account Routes
 */
export const authRoutes = "/auth"

export const loginRoute                     = new Route (MethodTypes.POST, authRoutes, "/login")
export const signupRoute                    = new Route (MethodTypes.POST, authRoutes, "/signup")
export const forgotPasswordRoute            = new Route (MethodTypes.POST, authRoutes, "/forgot")
export const verifyResetRoute               = new Route (MethodTypes.GET, authRoutes, "/verify")
export const resetPasswordRoute             = new Route (MethodTypes.POST, authRoutes, "/reset")

/**
 * @AccountRoutes
 */
export const accountRoutes = "/account"

export const getAccountRoute    = new Route (MethodTypes.GET, accountRoutes, "")
export const updateAccountRoute = new Route (MethodTypes.PATCH, accountRoutes, "/:accountId")
export const deleteAccountRoute = new Route (MethodTypes.DELETE, accountRoutes, "/:accountId")

/**
 * @Courses Routes
 */
export const coursesRoutes = "/courses"

export const getCoursesRoute = new Route (MethodTypes.GET, coursesRoutes, "")
export const uploadCoursesRoute = new Route (MethodTypes.POST, coursesRoutes, "")

/**
 * @Facebook
 */
export const facebookRoutes = "/facebook"

export const authorizeFacebookRoute     = new Route (MethodTypes.GET, facebookRoutes, "/authorize")
export const deauthorizeFacebookRoute   = new Route (MethodTypes.GET, facebookRoutes, "/deauthorize")
export const deleteFacebookRoute        = new Route (MethodTypes.GET, facebookRoutes, "/delete")
export const connectFacebookRoute        = new Route (MethodTypes.POST, facebookRoutes, "/connect")

/**
 * @Spotify
 */
export const spotifyRoutes = "/spotify"

export const getSpotifyDataRoute        = new Route (MethodTypes.POST, spotifyRoutes, "")
export const authorizeSpotifyRoute      = new Route (MethodTypes.GET, spotifyRoutes, "/authorize")
export const getTokenSpotifyRoute       = new Route (MethodTypes.GET, spotifyRoutes, "/callback")
export const deauthorizeSpotifyRoute    = new Route (MethodTypes.POST, spotifyRoutes, "/deauthorize")
export const deleteSpotifyRoute         = new Route (MethodTypes.POST, spotifyRoutes, "/delete")

/**
 * @Instagram
 */
export const instagramRoutes = "/instagram"

export const authorizeInstagramRoute     = new Route (MethodTypes.GET, instagramRoutes, "/authorize")
export const deauthorizeInstagramRoute   = new Route (MethodTypes.POST, instagramRoutes, "/deauthorize")
export const deleteInstagramRoute        = new Route (MethodTypes.POST, instagramRoutes, "/delete")

/**
 * @TestRoutes
 */
export const testRoutes = "/test"

/**
 * @Client
 */
export const ClientRoute = ((): string => {
  let route
  if (process.env.NODE_ENV === "development")
    route = "http://localhost:3000"
  else
    route = "https://educonnections.ca"
  return route
})()