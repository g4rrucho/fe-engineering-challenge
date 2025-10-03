export const formatDateString = (dateString: string): string =>
  new Date(dateString)
    .toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(/-/g, '/')
    .replace(/[.,]/g, '')
    .toUpperCase();
