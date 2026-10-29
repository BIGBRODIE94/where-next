const ORIGIN_KEY = 'where-next.origin'

export function loadOrigin(): string {
  try {
    return localStorage.getItem(ORIGIN_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveOrigin(origin: string): void {
  try {
    localStorage.setItem(ORIGIN_KEY, origin)
  } catch {
    // Private browsing can block storage; the trip still works for this session.
  }
}
