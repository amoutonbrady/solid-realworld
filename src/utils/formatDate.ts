export function formatDate(date: string) {
  try {
    return new Date(date).toLocaleString(navigator.language, {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    })
  } catch {
    return date
  }
}
