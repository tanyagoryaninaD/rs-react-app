import type { CountryData, ViewFields } from './types';

export interface CountriesCO2ContextProps {
  counties: Countries | null;
  menu: Menu;
  setViewColumns: (fields: ViewFields) => void;
  setSelectedYear: (year: number) => void;
  setSearchCountry: (query: string) => void;
}

export interface Menu {
  years: Years;
  searchCountry: string;
  viewColumns: ViewFields;
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
