import type { COUNTRY_DATA_KEYS } from './constants';

export type CountryDataKeys = (typeof COUNTRY_DATA_KEYS)[number];

export type CountryData = {
  [key in CountryDataKeys]?: number;
};

export type ViewFields = (keyof CountryData)[];
