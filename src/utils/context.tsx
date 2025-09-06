import React from 'react';
import type { CountriesCO2ContextProps } from '../types/interface';
import { createDefaultMenu } from './helpers';

export const CountriesCO2Context =
  React.createContext<CountriesCO2ContextProps>({
    counties: null,
    menu: createDefaultMenu(),
    setViewColumns: () => {},
    setSelectedYear: () => {},
    setSearchCountry: () => {},
    setSortCounties: () => {},
  });
