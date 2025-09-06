import { SORT_COUNTIES } from '../types/constants';
import type { Countries, MenuProps } from '../types/interface';
import type { CountryData, SortCountiesValues } from '../types/types';

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

export function getPopulation(data: CountryData[], selectedYear: number) {
  const populations = data.filter((item) => item.year === selectedYear)[0]
    .population;

  return populations;
}

export function createDefaultMenu(data?: Countries): MenuProps {
  if (!data) {
    return {
      years: {
        selectedYear: new Date().getFullYear(),
        allYears: [],
      },
      searchCountry: '',
      sortCounties: SORT_COUNTIES[0],
    };
  }

  const allYears = getAllYears(data);

  return {
    years: {
      selectedYear: allYears[0],
      allYears,
    },
    searchCountry: '',
    sortCounties: SORT_COUNTIES[0],
  };
}

export function isSortCounties(value: string): value is SortCountiesValues {
  return SORT_COUNTIES.includes(value as SortCountiesValues);
}

export function filteredCountriesByQuery(
  counties: Countries,
  query: string
): Countries {
  return Object.fromEntries(
    Object.entries(counties).filter(([key]) =>
      new RegExp(`^${query}`, 'i').test(key)
    )
  );
}

export function filteredCountriesByYear(
  counties: Countries,
  query: string
): Countries {
  return Object.fromEntries(
    Object.entries(counties).filter(([key]) =>
      new RegExp(`^${query}`, 'i').test(key)
    )
  );
}

export function getCountiesByMenuFilters(
  counties: Countries,
  query: string,
  sort: SortCountiesValues,
  year: number
): string[] {
  const filteredCountries = filteredCountriesByQuery(counties, query);
  let sortedCountriesKey: string[];

  switch (sort) {
    case SORT_COUNTIES[0]:
      sortedCountriesKey = sortByNameASD(filteredCountries);
      break;
    case SORT_COUNTIES[1]:
      sortedCountriesKey = sortByNameDESC(filteredCountries);
      break;
    case SORT_COUNTIES[2]:
      sortedCountriesKey = sortByPopulationASD(filteredCountries, year);
      break;
    case SORT_COUNTIES[3]:
      sortedCountriesKey = sortByPopulationDESC(filteredCountries, year);
      break;
    default:
      sortedCountriesKey = Object.keys(filteredCountries);
      break;
  }

  return sortedCountriesKey;
}

export function sortByNameASD(counties: Countries): string[] {
  return Object.keys(counties).sort((a, b) => a.localeCompare(b));
}

export function sortByNameDESC(counties: Countries): string[] {
  return Object.keys(counties).sort((a, b) => b.localeCompare(a));
}

export function sortByPopulationASD(
  counties: Countries,
  year: number
): string[] {
  return Object.keys(counties).sort((a, b) => {
    const populationA = getPopulation(counties[a].data, year);
    const populationB = getPopulation(counties[b].data, year);

    if (populationA && populationB) {
      return populationA - populationB;
    }

    return 0;
  });
}

export function sortByPopulationDESC(
  counties: Countries,
  year: number
): string[] {
  return Object.keys(counties).sort((a, b) => {
    const populationA = getPopulation(counties[a].data, year);
    const populationB = getPopulation(counties[b].data, year);

    if (populationA && populationB) {
      return populationB - populationA;
    }

    return 0;
  });
}
