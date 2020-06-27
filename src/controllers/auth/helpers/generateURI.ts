const { NODE_ENV, PORT } = process.env

const API_URL = "https://api.educonnections.ca"
const DEV_URL = `http://localhost:${PORT}`

export default function generateURI (extension: string): string {
  const URL = NODE_ENV === "development" ? DEV_URL : API_URL
  return URL + extension
}