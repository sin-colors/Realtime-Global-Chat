function isSameDay(dateString1: string, dateString2: string) {
  const day1 = new Date(dateString1);
  const day2 = new Date(dateString2);
  return (
    day1.getFullYear() === day2.getFullYear() &&
    day1.getMonth() === day2.getMonth() &&
    day1.getDate() === day2.getDate()
  );
}
export default isSameDay;
