import { useCallback } from 'react';
import type { SelectYearProps } from '../../../types/interface';
import SelectWrapper from './selectWrapper';
import React from 'react';

export default React.memo(function SelectYear(props: SelectYearProps) {
  const { selectedYear, setSelectedYear, allYears } = props;

  const handleChangeYear = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(parseInt(event.target.value));
    },
    [setSelectedYear]
  );

  return (
    <SelectWrapper
      label={'Select year'}
      value={selectedYear}
      onChange={handleChangeYear}
      name={'common-year'}
      id={'common-year'}
    >
      {allYears.map((item) => {
        return (
          <option key={`common-year-${item}`} value={item}>
            {item}
          </option>
        );
      })}
    </SelectWrapper>
  );
});
