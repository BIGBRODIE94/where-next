import { ORIGIN_CITIES, flagEmoji, type Country } from '../data/countries'
import {
  googleCarsUrl,
  googleExploreUrl,
  googleFlightsUrl,
  googleHotelsUrl,
} from '../lib/booking'

type TripPlannerProps = {
  country: Country
  origin: string
  depart: string
  returnDate: string
  onOriginChange: (value: string) => void
  onDepartChange: (value: string) => void
  onReturnChange: (value: string) => void
}

export function TripPlanner({
  country,
  origin,
  depart,
  returnDate,
  onOriginChange,
  onDepartChange,
  onReturnChange,
}: TripPlannerProps) {
  const flights = googleFlightsUrl(origin, country, depart, returnDate)
  const explore = googleExploreUrl(origin, country)
  const hotels = googleHotelsUrl(country, depart, returnDate)
  const cars = googleCarsUrl(country, depart, returnDate)

  return (
    <section className="planner" aria-labelledby="planner-heading">
      <p className="eyebrow">Your landing</p>
      <h2 id="planner-heading">
        <span>{flagEmoji(country.code)}</span>
        {country.name}
      </h2>
      <p className="planner-meta">
        {country.capital} · {country.region}
      </p>
      <p className="planner-copy">
        We will open Google Flights with this round trip filled in. Sort by price
        to grab the cheapest fare, then book a hotel and rental car the same way.
      </p>

      <form className="planner-form" onSubmit={(event) => event.preventDefault()}>
        <label>
          Flying from
          <input
            list="origin-cities"
            value={origin}
            onChange={(event) => onOriginChange(event.target.value)}
            placeholder="New York"
            autoComplete="off"
          />
        </label>
        <datalist id="origin-cities">
          {ORIGIN_CITIES.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
        <label>
          Depart
          <input
            type="date"
            value={depart}
            onChange={(event) => onDepartChange(event.target.value)}
          />
        </label>
        <label>
          Return
          <input
            type="date"
            value={returnDate}
            min={depart}
            onChange={(event) => onReturnChange(event.target.value)}
          />
        </label>
      </form>

      <div className="booking-grid">
        <a className="booking-card primary" href={flights} target="_blank" rel="noreferrer">
          <span>Cheapest round trip</span>
          <strong>Google Flights</strong>
          <small>Opens sorted search to {country.capital}</small>
        </a>
        <a className="booking-card" href={explore} target="_blank" rel="noreferrer">
          <span>Flexible dates</span>
          <strong>Explore calendar</strong>
          <small>Find the cheapest month</small>
        </a>
        <a className="booking-card" href={hotels} target="_blank" rel="noreferrer">
          <span>Stay</span>
          <strong>Hotels</strong>
          <small>Check-in {depart}</small>
        </a>
        <a className="booking-card" href={cars} target="_blank" rel="noreferrer">
          <span>Get around</span>
          <strong>Rental car</strong>
          <small>Pickup in {country.capital}</small>
        </a>
      </div>
    </section>
  )
}
