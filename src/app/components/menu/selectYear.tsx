import { useContext } from 'react';
import { CountriesCO2Context } from '../../../utils/context';

export default function SelectYear() {
  const context = useContext(CountriesCO2Context);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    context.setSelectedYear(parseInt(event.currentTarget.value));
  };

  return (
    <div className="common-year-wrapper">
      <label htmlFor="common-year">Select year</label>
      <select
        name="common-year"
        id="common-year"
        defaultValue={context.years.selectedYear}
        onChange={onChange}
      >
        {context.years.allYears.map((item) => {
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
