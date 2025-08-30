import { useContext, useMemo } from 'react';
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

  const filteredCountries = useMemo(() => {
    if (!counties) {
      return [];
    }

    return getCountiesByMenuFilters(
      counties,
      searchCountry,
      sortCounties,
      selectedYear
    );
  }, [counties, searchCountry, selectedYear, sortCounties]);

  const createCounties = useMemo(() => {
    if (!counties) {
      return;
    }

    return filteredCountries.map((country) => {
      return (
        <Country
          key={country}
          country={country}
          countryData={counties[country]}
        />
      );
    });
  }, [counties, filteredCountries]);

  return (
    <>
      <Menu />
      <div className="list">{createCounties}</div>
    </>
  );
}
