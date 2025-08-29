import { useContext } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import Country from './country';
import Menu from '../menu/menu';

export default function CountriesList() {
  const context = useContext(CountriesCO2Context);

  if (!context.counties) {
    return;
  }

  return (
    <>
      <Menu />
      <div className="list">
        {Object.keys(context.counties).map((country) => {
          if (!context.counties?.[country]) {
            return;
          }

          return (
            <Country
              key={country}
              country={country}
              countryData={context.counties[country]}
            />
          );
        })}
      </div>
    </>
  );
}
