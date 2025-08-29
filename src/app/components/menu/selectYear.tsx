import { useContext } from 'react';
import { CountriesCO2Context } from '../../../utils/context';

export default function SelectYear() {
  const context = useContext(CountriesCO2Context);
  const { years } = context.menu;

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    context.setSelectedYear(parseInt(event.currentTarget.value));
  };

  return (
    <div className="menu-field-wrapper">
      <label htmlFor="common-year">Select year</label>
      <select
        name="common-year"
        id="common-year"
        defaultValue={years.selectedYear}
        onChange={onChange}
      >
        {years.allYears.map((item) => {
          return (
            <option key={`common-year-${item}`} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
