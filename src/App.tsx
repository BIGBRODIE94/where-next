import { useCallback, useMemo, useState } from 'react'
import { CountryList } from './components/CountryList'
import { TripPlanner } from './components/TripPlanner'
import { Wheel } from './components/Wheel'
import { COUNTRIES, REGIONS, type Country, type Region } from './data/countries'
import { defaultTripDates } from './lib/dates'
import { loadOrigin, saveOrigin } from './lib/storage'
import './App.css'

const dates = defaultTripDates()

export default function App() {
  const [region, setRegion] = useState<'All' | Region>('All')
  const [targetIndex, setTargetIndex] = useState<number | null>(null)
  const [spinNonce, setSpinNonce] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [preview, setPreview] = useState<Country | null>(null)
  const [winner, setWinner] = useState<Country | null>(null)
  const [origin, setOrigin] = useState(loadOrigin)
  const [depart, setDepart] = useState(dates.depart)
  const [returnDate, setReturnDate] = useState(dates.returnDate)

  const pool = useMemo(
    () => (region === 'All' ? COUNTRIES : COUNTRIES.filter((country) => country.region === region)),
    [region],
  )

  const onTick = useCallback((country: Country) => {
    setPreview(country)
  }, [])

  const onSettled = useCallback((country: Country) => {
    setPreview(country)
    setWinner(country)
    setSpinning(false)
  }, [])

  function spin() {
    if (spinning || pool.length === 0) return
    let index = Math.floor(Math.random() * pool.length)
    if (winner && pool.length > 1) {
      const current = pool.findIndex((country) => country.code === winner.code)
      let attempts = 0
      while (index === current && attempts < 10) {
        index = Math.floor(Math.random() * pool.length)
        attempts += 1
      }
    }
    setWinner(null)
    setTargetIndex(index)
    setSpinNonce((value) => value + 1)
    setSpinning(true)
  }

  function updateOrigin(value: string) {
    setOrigin(value)
    saveOrigin(value)
  }

  function pickCountry(country: Country) {
    if (spinning) return
    const index = pool.findIndex((item) => item.code === country.code)
    setPreview(country)
    setWinner(country)
    if (index >= 0) setTargetIndex(index)
  }

  return (
    <div className="app">
      <div className="aurora" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">◎</span>
          <div>
            <p className="eyebrow">Decision engine</p>
            <h1>Where Next</h1>
          </div>
        </div>
        <p className="lede">
          Spin the world, land on a country, then jump into Google Flights, hotels, and a rental
          car.
        </p>
      </header>

      <div className="region-row" role="group" aria-label="Filter countries by region">
        <button
          type="button"
          className={region === 'All' ? 'chip is-on' : 'chip'}
          onClick={() => setRegion('All')}
        >
          All {COUNTRIES.length}
        </button>
        {REGIONS.map((item) => (
          <button
            key={item}
            type="button"
            className={region === item ? 'chip is-on' : 'chip'}
            onClick={() => setRegion(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <main className="layout">
        <section className="wheel-panel">
          <Wheel
            countries={pool}
            targetIndex={targetIndex}
            spinNonce={spinNonce}
            spinning={spinning}
            preview={preview}
            onTick={onTick}
            onSettled={onSettled}
          />
          <button type="button" className="spin-btn" onClick={spin} disabled={spinning}>
            {spinning ? 'Spinning…' : winner ? 'Spin Again' : 'Spin'}
          </button>
          <p className="spin-hint">
            {spinning
              ? 'Hang tight — the wheel is choosing.'
              : winner
                ? 'Not feeling it? Spin again for another country.'
                : 'One click. One country. Then book the trip.'}
          </p>
        </section>

        <section className={`result-panel ${winner ? 'has-winner' : ''}`}>
          {winner ? (
            <TripPlanner
              country={winner}
              origin={origin}
              depart={depart}
              returnDate={returnDate}
              onOriginChange={updateOrigin}
              onDepartChange={setDepart}
              onReturnChange={setReturnDate}
            />
          ) : (
            <div className="empty-result">
              <p className="eyebrow">Awaiting destiny</p>
              <h2>Let the wheel pick your next trip</h2>
              <p>
                {pool.length} countries are in play
                {region === 'All' ? '' : ` across ${region}`}. When it lands, we will open Google
                Flights with a round-trip search so you can sort by the cheapest fare.
              </p>
            </div>
          )}
        </section>

        <CountryList countries={pool} selected={winner} onPick={pickCountry} />
      </main>
    </div>
  )
}
