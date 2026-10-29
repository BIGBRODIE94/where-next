import { useEffect, useRef } from 'react'
import { flagEmoji, type Country } from '../data/countries'

const SLICE_COLORS = [
  '#1f6f6a',
  '#c45c3e',
  '#c9a227',
  '#2a4d7a',
  '#8a3d55',
  '#3d7a4a',
  '#7a4a2a',
  '#4a3d7a',
]

type WheelProps = {
  countries: Country[]
  targetIndex: number | null
  spinNonce: number
  spinning: boolean
  preview: Country | null
  onTick: (country: Country) => void
  onSettled: (country: Country) => void
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

function wrapIndex(rotation: number, count: number): number {
  const slice = (Math.PI * 2) / count
  const normalized = ((-rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  return Math.min(count - 1, Math.floor(normalized / slice))
}

function paintWheel(
  canvas: HTMLCanvasElement,
  countries: Country[],
  rotation: number,
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx || countries.length === 0) return

  const dpr = window.devicePixelRatio || 1
  const size = canvas.clientWidth
  canvas.width = size * dpr
  canvas.height = size * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const cx = size / 2
  const cy = size / 2
  const outer = size * 0.46
  const inner = size * 0.27
  const slice = (Math.PI * 2) / countries.length

  ctx.clearRect(0, 0, size, size)
  ctx.beginPath()
  ctx.arc(cx, cy, outer + 10, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(232, 196, 122, 0.55)'
  ctx.lineWidth = 8
  ctx.stroke()

  countries.forEach((_, index) => {
    const start = -Math.PI / 2 + rotation + index * slice
    const end = start + slice
    ctx.beginPath()
    ctx.arc(cx, cy, outer, start, end)
    ctx.arc(cx, cy, inner, end, start, true)
    ctx.closePath()
    ctx.fillStyle = SLICE_COLORS[index % SLICE_COLORS.length]
    ctx.fill()
  })

  ctx.beginPath()
  ctx.arc(cx, cy, inner - 2, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(243, 234, 216, 0.18)'
  ctx.lineWidth = 4
  ctx.stroke()

  if (slice > 0.14) {
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rotation)
    ctx.fillStyle = '#f6efe0'
    ctx.font = `600 ${Math.max(11, size * 0.028)}px Sora, sans-serif`
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    countries.forEach((country, index) => {
      ctx.save()
      ctx.rotate(index * slice + slice / 2 - Math.PI / 2)
      ctx.fillText(country.name, outer - 16, 0, outer - inner - 28)
      ctx.restore()
    })
    ctx.restore()
  }
}

export function Wheel({
  countries,
  targetIndex,
  spinNonce,
  spinning,
  preview,
  onTick,
  onSettled,
}: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef(0)
  const tickIndexRef = useRef(-1)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const draw = () => paintWheel(canvas, countries, rotationRef.current)
    draw()
    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [countries])

  useEffect(() => {
    if (spinNonce === 0 || targetIndex === null || countries.length === 0) return
    const canvas = canvasRef.current
    if (!canvas) return

    cancelAnimationFrame(frameRef.current)
    const count = countries.length
    const slice = (Math.PI * 2) / count
    const startRotation = rotationRef.current
    const extraSpins = 6 + Math.floor(Math.random() * 3)
    const aligned = -((targetIndex + 0.5) * slice)
    const delta =
      ((aligned - (startRotation % (Math.PI * 2))) % (Math.PI * 2) + Math.PI * 2) %
      (Math.PI * 2)
    const endRotation = startRotation + extraSpins * Math.PI * 2 + delta
    const duration = prefersReducedMotion() ? 1 : 5200
    const started = performance.now()
    tickIndexRef.current = -1

    const step = (now: number) => {
      const t = Math.min(1, (now - started) / duration)
      rotationRef.current = startRotation + (endRotation - startRotation) * easeOutCubic(t)
      const current = wrapIndex(rotationRef.current, count)
      if (current !== tickIndexRef.current) {
        tickIndexRef.current = current
        onTick(countries[current])
      }
      paintWheel(canvas, countries, rotationRef.current)
      if (t < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        onSettled(countries[targetIndex])
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [spinNonce, targetIndex, countries, onTick, onSettled])

  const shown = preview

  return (
    <div className="wheel-stage">
      <div className="wheel-pointer" aria-hidden="true" />
      <canvas ref={canvasRef} className="wheel-canvas" role="img" aria-label="Country prize wheel" />
      <div className={`wheel-hub ${spinning ? 'is-spinning' : ''}`}>
        {shown ? (
          <>
            <span className="wheel-flag">{flagEmoji(shown.code)}</span>
            <strong>{shown.name}</strong>
            <small>{shown.capital}</small>
          </>
        ) : (
          <>
            <span className="wheel-flag">🌍</span>
            <strong>Where next?</strong>
            <small>{countries.length} countries</small>
          </>
        )}
      </div>
    </div>
  )
}
