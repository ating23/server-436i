enum statusCodes {
  /** 1xx : Informational Requests */
  CONTINUE = 100,
  SWITCHING_PROTOCOL = 101,
  CHECKPOINT = 103,

  /** 2xx : Success Requests */
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,

  /** 3xx : Redirection */
  MOVED_PERMANENTLY = 300,
  FOUND = 300,
  NOT_MODIFIED = 300,
  USE_PROXY = 300,
  TEMPORARY_REDIRECT = 300,
  
  /** 4xx : Client Error */
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  REQUEST_TIMEOUT = 408,
  GONE = 410,
  TOO_MANY_REQUESTS = 429,

  /** 5xx : Server Error */
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}

export default statusCodes