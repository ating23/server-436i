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

export const loginRoute                     = new Route (MethodTypes.POST, authRoutes, "/login")
export const signupRoute                    = new Route (MethodTypes.POST, authRoutes, "/signup")
export const forgotPasswordRoute            = new Route (MethodTypes.POST, authRoutes, "/forgot")
export const verifyResetRoute               = new Route (MethodTypes.GET, authRoutes, "/reset/verify")
export const resetPasswordRoute             = new Route (MethodTypes.POST, authRoutes, "/reset")

/**
 * @AccountRoutes
 */
export const accountRoutes = "/account"

export const getAccountRoute    = new Route (MethodTypes.GET, accountRoutes, "/:accountId")
export const updateAccountRoute = new Route (MethodTypes.PATCH, accountRoutes, "/:accountId")
export const deleteAccountRoute = new Route (MethodTypes.DELETE, accountRoutes, "/:accountId")