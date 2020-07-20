/* eslint-disable @typescript-eslint/camelcase */
import { AxiosResponse } from "axios"

function validateTypeResponse(response: AxiosResponse<any>): void {
  if (!response.data || response.data.length < 1 || response.data.items.length < 1) {
    throw new Error("Response from Spotify API was empty.")
  }
}

export function validateArtists(response: AxiosResponse<any>): void {
  return validateTypeResponse(response)
}

export function validateTracks(response: AxiosResponse<any>): void {
  return validateTypeResponse(response)
}