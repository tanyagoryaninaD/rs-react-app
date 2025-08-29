import type { COUNTRY_DATA_KEYS, SORT_COUNTIES } from './constants';

export type CountryDataKeys = (typeof COUNTRY_DATA_KEYS)[number];
export type SortCountiesValues = (typeof SORT_COUNTIES)[number];

export type CountryData = {
  [key in CountryDataKeys]?: number;
};

export type ViewFields = (keyof CountryData)[];
