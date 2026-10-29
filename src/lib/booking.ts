import type { Country } from '../data/countries'

function q(value: string): string {
  return encodeURIComponent(value)
}

export function googleFlightsUrl(
  origin: string,
  country: Country,
  depart: string,
  returnDate: string,
): string {
  const destination = `${country.capital}, ${country.name}`
  const query = origin.trim()
    ? `Round trip flights from ${origin.trim()} to ${destination} on ${depart} through ${returnDate}`
    : `Round trip flights to ${destination} on ${depart} through ${returnDate}`
  return `https://www.google.com/travel/flights?hl=en&curr=USD&q=${q(query)}`
}

export function googleExploreUrl(origin: string, country: Country): string {
  const query = origin.trim()
    ? `Flights from ${origin.trim()} to ${country.name}`
    : `Flights to ${country.name}`
  return `https://www.google.com/travel/explore?hl=en&q=${q(query)}`
}

export function googleHotelsUrl(
  country: Country,
  depart: string,
  returnDate: string,
): string {
  const place = `${country.capital}, ${country.name}`
  return `https://www.google.com/travel/hotels/${q(place)}?hl=en&q=${q(`Hotels in ${place}`)}&checkin=${q(depart)}&checkout=${q(returnDate)}`
}

export function googleCarsUrl(
  country: Country,
  depart: string,
  returnDate: string,
): string {
  const place = `${country.capital}, ${country.name}`
  return `https://www.google.com/travel/cars?hl=en&q=${q(`Car rental in ${place} from ${depart} to ${returnDate}`)}`
}
