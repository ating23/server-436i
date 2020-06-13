// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Message = any

export default class Logger {
  public static Error (...args: Array<Message>): void {
    if(process.env.NODE_ENV === "development") {
      console.error(...args);
    }
  }

  public static Log (...args: Array<Message>): void {
    if(process.env.NODE_ENV === "development") {
      console.log(...args);
    }
  }
}