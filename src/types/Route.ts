import { MethodTypes } from "./MethodTypes";

export default class Route {
  method: MethodTypes
  relative: string
  url: string

  constructor (method: MethodTypes, base: string, relative: string) {
    this.method = method
    this.url = `${base}${relative}`
    this.relative = relative
  }
}