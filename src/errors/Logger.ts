type Message = string | number | object | null

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