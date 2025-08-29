import { use, useState } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import CountriesList from '../list/countries';
import { getDataPromise } from '../../api/getCO2data';
import Widget from '../widget';
import type { Menu } from '../../../types/interface';
import { createDefaultMenu } from '../../../utils/helpers';
import type { ViewFields } from '../../../types/types';

export default function Main() {
  const data = use(getDataPromise());
  const [menu, setMenu] = useState<Menu>(createDefaultMenu(data));

  const setViewColumns = (viewColumns: ViewFields) => {
    setMenu((prev) => ({ ...prev, viewColumns }));
  };

  const setSelectedYear = (selectedYear: number) => {
    setMenu((prev) => ({ ...prev, years: { ...prev.years, selectedYear } }));
  };

  const setSearchCountry = (searchCountry: string) => {
    setMenu((prev) => ({ ...prev, searchCountry }));
  };

  return (
    <CountriesCO2Context.Provider
      value={{
        counties: data,
        menu,
        setViewColumns,
        setSelectedYear,
        setSearchCountry,
      }}
    >
      <CountriesList />
      <Widget />
    </CountriesCO2Context.Provider>
  );
}
