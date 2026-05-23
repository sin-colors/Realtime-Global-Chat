function formatDate(dateString: string) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
}
export default formatDate;
