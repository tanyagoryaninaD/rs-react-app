import React from 'react';
import type { SearchCountryProps } from '../../../types/interface';

export default React.memo(function SearchCountry(props: SearchCountryProps) {
  const { setSearchCountry } = props;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCountry(event.target.value);
  };

  return (
    <div className="menu-field-wrapper">
      <label htmlFor="search-country">Search country</label>
      <input
        type="text"
        name="search-country"
        id="search-country"
        onInput={handleInput}
      />
    </div>
  );
});
