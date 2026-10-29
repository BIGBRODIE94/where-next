import { AirportPicker } from './AirportPicker'
import { flagEmoji, type Country } from '../data/countries'
import {
  bookingHotelsUrl,
  cheapestMonthUrl,
  destinationCode,
  googleFlightsUrl,
  kayakCarsUrl,
  originCode,
  pricelineHotelsUrl,
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
  const from = originCode(origin)
  const to = destinationCode(country)
  const flights = googleFlightsUrl(origin, country, depart, returnDate)
  const explore = cheapestMonthUrl(origin, country)
  const priceline = pricelineHotelsUrl(country, depart, returnDate)
  const booking = bookingHotelsUrl(country, depart, returnDate)
  const cars = kayakCarsUrl(country, depart, returnDate)

  return (
    <section className="planner" aria-labelledby="planner-heading">
      <p className="eyebrow">Your landing</p>
      <h2 id="planner-heading">
        <span>{flagEmoji(country.code)}</span>
        {country.name}
      </h2>
      <p className="planner-meta">
        {country.capital} · {country.region} · {to}
      </p>
      <p className="planner-copy">
        Pick your airport and dates, then open a search that is already filled in. Hotels sort
        cheap first on Priceline and Booking.com. Cars open on Kayak. The calendar shows the
        cheapest month on Skyscanner.
      </p>

      <form className="planner-form" onSubmit={(event) => event.preventDefault()}>
        <AirportPicker value={origin} onChange={onOriginChange} />
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
          <small>
            {from ?? 'Your airport'} → {to} · {depart} to {returnDate}
          </small>
        </a>
        <a className="booking-card" href={explore} target="_blank" rel="noreferrer">
          <span>Flexible dates</span>
          <strong>Explore calendar</strong>
          <small>Skyscanner cheapest month {from ? `${from} → ${to}` : `to ${to}`}</small>
        </a>
        <div className="booking-card">
          <span>Stay</span>
          <strong>Cheap hotels</strong>
          <small>
            {country.capital} · {depart} to {returnDate}
          </small>
          <div className="booking-actions">
            <a href={priceline} target="_blank" rel="noreferrer">
              Priceline
            </a>
            <a href={booking} target="_blank" rel="noreferrer">
              Booking.com
            </a>
          </div>
        </div>
        <a className="booking-card" href={cars} target="_blank" rel="noreferrer">
          <span>Get around</span>
          <strong>Rental car</strong>
          <small>
            Kayak pickup in {to} · {depart} to {returnDate}
          </small>
        </a>
      </div>
    </section>
  )
}
