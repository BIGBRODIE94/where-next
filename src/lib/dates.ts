export function isoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function defaultTripDates(today = new Date()): { depart: string; returnDate: string } {
  const depart = addDays(today, 42)
  const returnDate = addDays(depart, 7)
  return { depart: isoDate(depart), returnDate: isoDate(returnDate) }
}
