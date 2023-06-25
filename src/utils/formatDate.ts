export function formatDate(defaultDate: string) {
  const fullDate = new Date(defaultDate);
  const day = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();

  return `${day}/${month + 1}/${year}`;
}