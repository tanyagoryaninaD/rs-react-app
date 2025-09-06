import '../../../styles/Menu.scss';
import SearchCountry from './searchCountry';
import { useContext } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import SelectYear from './selectYear';
import SortCounties from './sortCounties';

export default function Menu() {
  const {
    setSearchCountry,
    setSelectedYear,
    setSortCounties,
    menu: {
      years: { allYears, selectedYear },
      sortCounties,
    },
  } = useContext(CountriesCO2Context);

  return (
    <div className="menu">
      <SearchCountry setSearchCountry={setSearchCountry} />
      <SelectYear
        selectedYear={selectedYear}
        allYears={allYears}
        setSelectedYear={setSelectedYear}
      />
      <SortCounties
        sortCounties={sortCounties}
        setSortCounties={setSortCounties}
      />
    </div>
  );
}
