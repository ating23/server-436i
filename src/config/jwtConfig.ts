const NUM_DAYS = 7
const NUM_HOURS = 24
const NUM_MINUTES = 60
const NUM_SECONDS = 60

export const SECRET_OR_PRIVATE_KEY = process.env.JWT_KEY || "MYPRIVATEKEY"

export const jwtConfig = { 
  expiresIn: (NUM_DAYS * NUM_HOURS * NUM_MINUTES * NUM_SECONDS), // in seconds
}