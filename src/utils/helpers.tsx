export function getHeadColumn(key: string) {
  const parsed = key.split('_').join(' ');

  return parsed[0].toUpperCase() + parsed.slice(1);
}
