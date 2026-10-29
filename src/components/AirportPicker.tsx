import { useMemo, useState } from 'react'
import {
  formatAirport,
  resolveAirport,
  searchAirports,
  type Airport,
} from '../data/airports'

type AirportPickerProps = {
  value: string
  onChange: (value: string) => void
}

export function AirportPicker({ value, onChange }: AirportPickerProps) {
  const [open, setOpen] = useState(false)
  const matches = useMemo(() => searchAirports(value, 8), [value])
  const resolved = resolveAirport(value)

  function pick(airport: Airport) {
    onChange(formatAirport(airport))
    setOpen(false)
  }

  return (
    <label className="airport-picker">
      Flying from
      <input
        value={value}
        onChange={(event) => {
          onChange(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 120)
        }}
        placeholder="PHL, LGA, LaGuardia..."
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open}
      />
      {open && matches.length > 0 ? (
        <ul className="airport-menu" role="listbox">
          {matches.map((airport) => (
            <li key={airport.iata}>
              <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => pick(airport)}>
                <strong>{airport.iata}</strong>
                <span>
                  {airport.city}
                  <small>{airport.name}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <small className="field-hint">
        {resolved
          ? `Using ${resolved.iata} · ${resolved.name}`
          : 'Type a US airport code or city, like PHL or LaGuardia'}
      </small>
    </label>
  )
}
