import { use, useCallback, useMemo, useState } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import CountriesList from '../list/countries';
import { dataCountries } from '../../api/getCO2data';
import Widget from '../widget';
import type { Menu } from '../../../types/interface';
import { createDefaultMenu } from '../../../utils/helpers';
import type { SortCountiesValues, ViewFields } from '../../../types/types';

export default function Main() {
  const data = use(dataCountries);
  const defaultMenu = useMemo(() => createDefaultMenu(data), [data]);
  const [menu, setMenu] = useState<Menu>(defaultMenu);

  const setViewColumns = useCallback((viewColumns: ViewFields) => {
    setMenu((prev) => ({ ...prev, viewColumns }));
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

  const setMethods = useMemo(
    () => ({
      setViewColumns,
      setSelectedYear,
      setSearchCountry,
      setSortCounties,
    }),
    [setViewColumns, setSelectedYear, setSearchCountry, setSortCounties]
  );

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
