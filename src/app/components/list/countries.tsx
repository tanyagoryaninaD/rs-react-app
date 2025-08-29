import { useContext } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import Country from './country';
import Menu from '../menu/menu';
import { getCountiesByMenuFilters } from '../../../utils/helpers';

export default function CountriesList() {
  const context = useContext(CountriesCO2Context);
  const {
    counties,
    menu: {
      searchCountry,
      sortCounties,
      years: { selectedYear },
    },
  } = context;

  if (!counties) {
    return;
  }

  return (
    <>
      <Menu />
      <div className="list">
        {getCountiesByMenuFilters(
          counties,
          searchCountry,
          sortCounties,
          selectedYear
        ).map((country) => {
          return (
            <Country
              key={country}
              country={country}
              countryData={counties[country]}
            />
          );
        })}
      </div>
    </>
  );
}
