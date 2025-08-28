import { use, useState } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import CountriesList from '../list/countries';
import { getDataPromise } from '../../api/getCO2data';
import { DEFAULT_COLUMNS } from '../../../types/constants';
import type { ViewFields } from '../../../types/types';
import Widget from '../widget';

export default function Main() {
  const data = use(getDataPromise());
  const [viewColumns, setViewColumns] = useState<ViewFields>(DEFAULT_COLUMNS);

  return (
    <CountriesCO2Context.Provider
      value={{
        counties: data,
        viewColumns,
        setViewColumns,
      }}
    >
      <CountriesList />
      <Widget />
    </CountriesCO2Context.Provider>
  );
}
