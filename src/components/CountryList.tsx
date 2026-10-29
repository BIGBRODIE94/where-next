import { useMemo, useState } from 'react'
import { flagEmoji, type Country } from '../data/countries'

type CountryListProps = {
  countries: Country[]
  selected: Country | null
  onPick: (country: Country) => void
}

export function CountryList({ countries, selected, onPick }: CountryListProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return countries
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(needle) ||
        country.capital.toLowerCase().includes(needle) ||
        country.code.toLowerCase().includes(needle),
    )
  }, [countries, query])

  return (
    <aside className="country-drawer" aria-labelledby="country-list-heading">
      <div className="drawer-head">
        <h2 id="country-list-heading">Every country</h2>
        <p>{countries.length} destinations on the wheel</p>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Brazil, Mexico, India..."
          aria-label="Search countries"
        />
      </div>
      <ul className="country-list">
        {filtered.map((country) => {
          const active = selected?.code === country.code
          return (
            <li key={country.code}>
              <button
                type="button"
                className={active ? 'is-active' : undefined}
                onClick={() => onPick(country)}
              >
                <span className="list-flag">{flagEmoji(country.code)}</span>
                <span>
                  <strong>{country.name}</strong>
                  <small>
                    {country.capital} · {country.region}
                  </small>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
