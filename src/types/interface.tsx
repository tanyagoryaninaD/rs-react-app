import type { ReactNode } from 'react';
import type { CountryData, SortCountiesValues, ViewFields } from './types';

export interface CountriesCO2ContextProps {
  counties: Countries | null;
  menu: MenuProps;
  viewColumns: ViewFields;
  setViewColumns: (fields: ViewFields) => void;
  setSelectedYear: (year: number) => void;
  setSearchCountry: (query: string) => void;
  setSortCounties: (value: SortCountiesValues) => void;
}

export interface MenuProps {
  years: Years;
  searchCountry: string;
  sortCounties: SortCountiesValues;
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
  name: string;
  data: Country;
  selectedYear: number;
}

export interface FieldProps {
  label: string;
  value: number | string;
  name: string;
  id: string;
}

export interface SelectWrapperProps extends FieldProps, ComponentProvider {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface SortProps
  extends Pick<CountriesCO2ContextProps, 'setSortCounties'>,
    Pick<MenuProps, 'sortCounties'> {}

export interface SelectYearProps
  extends Pick<CountriesCO2ContextProps, 'setSelectedYear'>,
    Years {}

export type SearchCountryProps = Pick<
  CountriesCO2ContextProps,
  'setSearchCountry'
>;

export interface ComponentProvider {
  children: ReactNode;
}

export type TableProps = Pick<Country, 'data'>;

export interface WidgetDialogProps
  extends Pick<CountriesCO2ContextProps, 'setViewColumns'>,
    Pick<CountriesCO2ContextProps, 'viewColumns'> {
  toggleDialog: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}
