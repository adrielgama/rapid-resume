export function formatDate(date: number | null) {
  if (date === null) return 'Invalid date'
  return (
    new Date(date * 1000).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) +
    ' ' +
    new Date(date * 1000).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  )
} // 23/04/2025 23:38
