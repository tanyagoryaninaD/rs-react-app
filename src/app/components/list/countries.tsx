import { useContext, useMemo } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import Country from './country/country';
import { getCountiesByMenuFilters } from '../../../utils/helpers';

export default function CountriesList() {
  const {
    counties,
    menu: {
      searchCountry,
      sortCounties,
      years: { selectedYear },
    },
  } = useContext(CountriesCO2Context);

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
          name={country}
          data={counties[country]}
          selectedYear={selectedYear}
        />
      );
    });
  }, [counties, filteredCountries, selectedYear]);

  return <div className="list">{createCounties}</div>;
}
