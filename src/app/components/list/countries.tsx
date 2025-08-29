import { useContext } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import Country from './country';
import Menu from '../menu/menu';

export default function CountriesList() {
  const context = useContext(CountriesCO2Context);
  const {
    counties,
    menu: { searchCountry },
  } = context;

  if (!counties) {
    return;
  }

  const filteredCountries = (): string[] => {
    return Object.keys(counties).filter((key) =>
      new RegExp(`^${searchCountry}`, 'i').test(key)
    );
  };

  return (
    <>
      <Menu />
      <div className="list">
        {filteredCountries().map((country) => {
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
