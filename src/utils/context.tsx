import React from 'react';
import type { CountriesCO2ContextProps } from '../types/interface';
import { DEFAULT_COLUMNS } from '../types/constants';

export const CountriesCO2Context =
  React.createContext<CountriesCO2ContextProps>({
    counties: null,
    viewColumns: DEFAULT_COLUMNS,
    setViewColumns: () => {},
  });
