import { use, useState } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import CountriesList from '../list/countries';
import { dataCountries } from '../../api/getCO2data';
import Widget from '../widget';
import type { Menu } from '../../../types/interface';
import { createDefaultMenu } from '../../../utils/helpers';
import type { SortCountiesValues, ViewFields } from '../../../types/types';

export default function Main() {
  const data = use(dataCountries);
  const [menu, setMenu] = useState<Menu>(createDefaultMenu(data));

  const setMethods = {
    setViewColumns: (viewColumns: ViewFields) => {
      setMenu((prev) => ({ ...prev, viewColumns }));
    },
    setSelectedYear: (selectedYear: number) => {
      setMenu((prev) => ({ ...prev, years: { ...prev.years, selectedYear } }));
    },
    setSearchCountry: (searchCountry: string) => {
      setMenu((prev) => ({ ...prev, searchCountry }));
    },
    setSortCounties: (sortCounties: SortCountiesValues) => {
      setMenu((prev) => ({ ...prev, sortCounties }));
    },
  };

  return (
    <CountriesCO2Context.Provider
      value={{
        counties: data,
        menu,
        ...setMethods,
      }}
    >
      <CountriesList />
      <Widget />
    </CountriesCO2Context.Provider>
  );
}
