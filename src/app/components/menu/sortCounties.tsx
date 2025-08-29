import { useContext } from 'react';
import { CountriesCO2Context } from '../../../utils/context';
import { SORT_COUNTIES } from '../../../types/constants';
import { isSortCounties } from '../../../utils/helpers';

export default function SortCounties() {
  const context = useContext(CountriesCO2Context);
  const {
    menu: { sortCounties },
    setSortCounties,
  } = context;

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;

    if (isSortCounties(value)) {
      setSortCounties(value);
    }
  };

  return (
    <div className="menu-field-wrapper">
      <label htmlFor="sort-counties">Sort</label>
      <select
        name="sort-counties"
        id="sort-counties"
        defaultValue={sortCounties}
        onChange={onChange}
      >
        {SORT_COUNTIES.map((value) => {
          return (
            <option key={`sort-${value}`} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
