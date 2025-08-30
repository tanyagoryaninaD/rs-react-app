import { useCallback, useContext } from 'react';
import { CountriesCO2Context } from '../../../utils/context';

export default function SearchCountry() {
  const context = useContext(CountriesCO2Context);
  const { setSearchCountry } = context;

  const onInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchCountry(event.currentTarget.value);
    },
    [setSearchCountry]
  );

  return (
    <div className="menu-field-wrapper">
      <label htmlFor="search-country">Search country</label>
      <input
        type="text"
        name="search-country"
        id="search-country"
        onInput={onInput}
      />
    </div>
  );
}
