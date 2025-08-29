import type { CountryData, ViewFields } from './types';

export interface CountriesCO2ContextProps {
  counties: Countries | null;
  viewColumns: ViewFields;
  years: Years;
  setViewColumns: (fields: ViewFields) => void;
  setSelectedYear: (year: number) => void;
}

export interface Years {
  selectedYear: number;
  allYears: number[];
}

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
