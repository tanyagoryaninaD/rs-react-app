import type { CountryData } from './types';

export interface Countries {
  [country: string]: {
    iso_code: string;
    data: CountryData[];
  };
}

export interface Country {
  iso_code: string;
  data: CountryData[];
}

export interface CountryProps {
  country: string;
  countryData: Country;
}
