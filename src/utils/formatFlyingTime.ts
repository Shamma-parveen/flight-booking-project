function formatFlyingTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hours ${minutes} mins`;
}
export default formatFlyingTime;
