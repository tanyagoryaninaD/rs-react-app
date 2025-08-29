import { use, useState } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import CountriesList from '../list/countries';
import { getDataPromise } from '../../api/getCO2data';
import { DEFAULT_COLUMNS } from '../../../types/constants';
import type { ViewFields } from '../../../types/types';
import Widget from '../widget';
import type { Years } from '../../../types/interface';
import { getAllYears } from '../../../utils/helpers';

export default function Main() {
  const data = use(getDataPromise());
  const [viewColumns, setViewColumns] = useState<ViewFields>(DEFAULT_COLUMNS);
  const allYears = getAllYears(data);
  const [years, setYears] = useState<Years>({
    selectedYear: allYears[0],
    allYears,
  });

  const setSelectedYear = (selectedYear: number) => {
    setYears((prev) => ({ ...prev, selectedYear }));
  };

  return (
    <CountriesCO2Context.Provider
      value={{
        counties: data,
        viewColumns,
        years,
        setViewColumns,
        setSelectedYear,
      }}
    >
      <CountriesList />
      <Widget />
    </CountriesCO2Context.Provider>
  );
}
