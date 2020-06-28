import { MethodTypes } from "./MethodTypes"
import { DEV_BASE_URL, PROD_BASE_URL } from "../api/routes"

const { NODE_ENV } = process.env

export default class Route {
  method: MethodTypes
  relative: string
  url: string

  constructor (method: MethodTypes, base: string, relative: string) {
    this.method = method
    this.url = `${base}${relative}`
    this.relative = relative
  }

  public getFullRoute (): string {
    let route
    if (NODE_ENV === "development") {
      route = DEV_BASE_URL
    } else {
      route = PROD_BASE_URL
    }

    return `${route}${this.url}`
  }
}