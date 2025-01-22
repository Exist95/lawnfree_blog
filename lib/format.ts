export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = date
    .toISOString()
    .slice(0, 16)
    .replace('T', ' ')
    .split('-');
  return `${formattedDate[0].slice(2)}-${formattedDate[1]}-${formattedDate[2]}`;
}