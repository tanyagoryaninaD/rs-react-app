import { DEFAULT_COLUMNS } from '../types/constants';
import type { Countries, Menu } from '../types/interface';

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

export function createDefaultMenu(data: Countries): Menu {
  const allYears = getAllYears(data);

  return {
    years: {
      selectedYear: allYears[0],
      allYears,
    },
    searchCountry: '',
    viewColumns: DEFAULT_COLUMNS,
  };
}
