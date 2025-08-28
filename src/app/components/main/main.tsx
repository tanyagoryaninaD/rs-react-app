import { use } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import CountriesList from '../list/countries';
import { getDataPromise } from '../../api/getCO2data';

export default function Main() {
  const data = use(getDataPromise());

  return (
    <CountriesCO2Context.Provider value={data}>
      <CountriesList />
    </CountriesCO2Context.Provider>
  );
}
