import { useCallback, useContext, useMemo } from 'react';
import { CountriesCO2Context } from '../../../utils/context';

export default function SelectYear() {
  const context = useContext(CountriesCO2Context);
  const {
    setSelectedYear,
    menu: { years },
  } = context;

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(parseInt(event.currentTarget.value));
    },
    [setSelectedYear]
  );

  const Years = useMemo(() => {
    return years.allYears.map((item) => {
      return (
        <option key={`common-year-${item}`} value={item}>
          {item}
        </option>
      );
    });
  }, [years.allYears]);

  return (
    <div className="menu-field-wrapper">
      <label htmlFor="common-year">Select year</label>
      <select
        name="common-year"
        id="common-year"
        defaultValue={years.selectedYear}
        onChange={onChange}
      >
        {Years}
      </select>
    </div>
  );
}
