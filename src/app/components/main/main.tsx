import { use, useCallback, useMemo, useState } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import CountriesList from '../list/countries';
import { dataCountries } from '../../api/getCO2data';
import Widget from '../widget/widget';
import { createDefaultMenu } from '../../../utils/helpers';
import type { SortCountiesValues, ViewFields } from '../../../types/types';
import Menu from '../menu/menu';
import type { MenuProps } from '../../../types/interface';
import { DEFAULT_COLUMNS } from '../../../types/constants';

export default function Main() {
  const data = use(dataCountries);
  const defaultMenu = useMemo(() => createDefaultMenu(data), [data]);
  const [menu, setMenu] = useState<MenuProps>(defaultMenu);
  const [viewColumns, setColumns] = useState<ViewFields>(DEFAULT_COLUMNS);

  const setViewColumns = useCallback((viewColumns: ViewFields) => {
    setColumns(viewColumns);
  }, []);

  const setSelectedYear = useCallback((selectedYear: number) => {
    setMenu((prev) => ({ ...prev, years: { ...prev.years, selectedYear } }));
  }, []);

  const setSearchCountry = useCallback((searchCountry: string) => {
    setMenu((prev) => ({ ...prev, searchCountry }));
  }, []);

  const setSortCounties = useCallback((sortCounties: SortCountiesValues) => {
    setMenu((prev) => ({ ...prev, sortCounties }));
  }, []);

  const setMethods = {
    setViewColumns,
    setSelectedYear,
    setSearchCountry,
    setSortCounties,
  };

  return (
    <CountriesCO2Context.Provider
      value={{
        counties: data,
        menu,
        viewColumns,
        ...setMethods,
      }}
    >
      <Menu />
      <CountriesList />
      <Widget />
    </CountriesCO2Context.Provider>
  );
}
