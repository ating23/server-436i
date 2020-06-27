import Route from "../types/Route"
import { MethodTypes } from "../types/MethodTypes"

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
export const accountRoutes = "/profile"

export const getAccountRoute    = new Route (MethodTypes.GET, accountRoutes, "/:accountId")
export const updateAccountRoute = new Route (MethodTypes.PATCH, accountRoutes, "/:accountId")
export const deleteAccountRoute = new Route (MethodTypes.DELETE, accountRoutes, "/:accountId")

/**
 * @Facebook
 */
export const facebookRoutes = "/facebook"

export const authorizeFacebookRoute     = new Route (MethodTypes.GET, facebookRoutes, "/authorize")
export const deauthorizeFacebookRoute   = new Route (MethodTypes.GET, facebookRoutes, "/deauthorize")
export const deleteFacebookRoute        = new Route (MethodTypes.GET, facebookRoutes, "/delete")

/**
 * @Instagram
 */
export const instagramRoutes = "/instagram"

export const authorizeInstagramRoute     = new Route (MethodTypes.GET, instagramRoutes, "/authorize")
export const deauthorizeInstagramRoute   = new Route (MethodTypes.GET, instagramRoutes, "/deauthorize")
export const deleteInstagramRoute        = new Route (MethodTypes.GET, instagramRoutes, "/delete")

/**
 * @TestRoutes
 */
export const testRoutes = "/test"