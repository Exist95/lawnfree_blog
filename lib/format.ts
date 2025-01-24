export function formatDate(dateString: string, onlyDay?: boolean) {
  const date = new Date(dateString);

  const kstOffset = 9 * 60;
  const utcDate = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
  const kstDate = new Date(utcDate + (kstOffset * 60 * 1000));

  const formattedDate = kstDate
    .toISOString()
    .slice(0, 16)
    .replace('T', ' ');

  if (onlyDay) {
    return formattedDate.slice(2, 10);
  } else {
    return formattedDate;
  }
}
