import type { Countries } from '../types/interface';

export function getHeadColumn(key: string) {
  const parsed = key.split('_').join(' ');

  return parsed[0].toUpperCase() + parsed.slice(1);
}

export function getAllYears(counties: Countries): number[] {
  const years = Object.entries(counties)[0][1]
    .data.map((item) => item.year)
    .filter((item): item is number => !!item);

  return years.sort((a, b) => {
    return b - a;
  });
}
