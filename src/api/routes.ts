import Route from "../types/Route"
import { MethodTypes } from "../types/MethodTypes"

export const apiRoute = "/api"

/**
 * @Session Routes
 */
export const sessionRoutes = "/session"

export const verifySessionRoute = new Route(MethodTypes.POST, sessionRoutes, "/verify")

/**
 * @Account Routes
 */
export const authRoutes = "/auth"

export const forgotPasswordRoute            = new Route (MethodTypes.POST, authRoutes, "/forgot")
export const loginRoute                     = new Route (MethodTypes.POST, authRoutes, "/login")
export const verifyResetPasswordTokenRoute  = new Route (MethodTypes.GET, authRoutes, "/reset/:accountId/:token")
export const resetPasswordRoute             = new Route (MethodTypes.POST, authRoutes, "/reset")
export const signupRoute                    = new Route (MethodTypes.POST, authRoutes, "/signup")

/**
 * @AccountRoutes
 */
export const accountRoutes = "/account"

export const getAccountRoute    = new Route (MethodTypes.GET, accountRoutes, "/:accountId")
export const updateAccountRoute = new Route (MethodTypes.PATCH, accountRoutes, "/:accountId")
export const deleteAccountRoute = new Route (MethodTypes.DELETE, accountRoutes, "/:accountId")