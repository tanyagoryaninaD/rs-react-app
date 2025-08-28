import { useContext } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import Country from './country';

export default function CountriesList() {
  const context = useContext(CountriesCO2Context);
  console.log('🚀 ~ CountriesList ~ context:', Object.keys(context || {}));

  if (!context) {
    return;
  }

  return (
    <>
      <h1>Our World in Data</h1>
      <div className="list">
        {Object.keys(context).map((country) => {
          return (
            <Country
              key={country}
              country={country}
              countryData={context[country]}
            />
          );
        })}
      </div>
    </>
  );
}
