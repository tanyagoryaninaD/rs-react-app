import type { COUNTRY_DATA_KEYS } from './constants';

type CountryDataKeys = (typeof COUNTRY_DATA_KEYS)[number];

export type CountryData = {
  [key in CountryDataKeys]?: number;
};
