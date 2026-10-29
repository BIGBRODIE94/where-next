import { resolveAirport } from '../data/airports'
import type { Country } from '../data/countries'
import { GATEWAYS } from '../data/gateways'

function q(value: string): string {
  return encodeURIComponent(value)
}

function compactDate(iso: string): string {
  return iso.replaceAll('-', '')
}

function slug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function originCode(origin: string): string | undefined {
  return resolveAirport(origin)?.iata
}

export function destinationCode(country: Country): string {
  return GATEWAYS[country.code] ?? country.capital
}

export function googleFlightsUrl(
  origin: string,
  country: Country,
  depart: string,
  returnDate: string,
): string {
  const from = originCode(origin)
  const to = destinationCode(country)
  if (from) {
    return `https://www.google.com/travel/flights?hl=en&curr=USD#flt=${from}.${to}.${depart}*${to}.${from}.${returnDate}`
  }
  return `https://www.google.com/travel/flights?hl=en&curr=USD&q=${q(`Round trip to ${to} on ${depart} through ${returnDate}`)}`
}

export function cheapestMonthUrl(origin: string, country: Country): string {
  const from = originCode(origin)
  const to = destinationCode(country).toLowerCase()
  if (from) {
    return `https://www.skyscanner.com/transport/flights/${from.toLowerCase()}/${to}/?adultsv2=1&cabinclass=economy&rtn=1`
  }
  return `https://www.skyscanner.com/transport/flights/${to}/?adultsv2=1&cabinclass=economy&rtn=1`
}

export function pricelineHotelsUrl(
  country: Country,
  depart: string,
  returnDate: string,
): string {
  const place = slug(`${country.capital} ${country.name}`)
  return `https://www.priceline.com/relax/at/${place}/from/${compactDate(depart)}/to/${compactDate(returnDate)}/rooms/1`
}

export function bookingHotelsUrl(
  country: Country,
  depart: string,
  returnDate: string,
): string {
  const place = `${country.capital}, ${country.name}`
  return `https://www.booking.com/searchresults.html?ss=${q(place)}&checkin=${depart}&checkout=${returnDate}&group_adults=2&no_rooms=1&selected_currency=USD&order=price`
}

export function kayakCarsUrl(
  country: Country,
  depart: string,
  returnDate: string,
): string {
  const to = destinationCode(country)
  if (to.length === 3) {
    return `https://www.kayak.com/cars/${to}/${depart}/${returnDate}`
  }
  return `https://www.kayak.com/cars/${q(`${country.capital}, ${country.name}`)}/${depart}/${returnDate}`
}
