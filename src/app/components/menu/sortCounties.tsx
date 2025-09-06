import React, { useCallback } from 'react';
import { SORT_COUNTIES } from '../../../types/constants';
import type { SortProps } from '../../../types/interface';
import SelectWrapper from './selectWrapper';
import { isSortCounties } from '../../../utils/helpers';

export default React.memo(function SortCounties(props: SortProps) {
  const { sortCounties, setSortCounties } = props;

  const handleChangeCounties = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;

      if (isSortCounties(value)) {
        setSortCounties(value);
      }
    },
    [setSortCounties]
  );

  return (
    <SelectWrapper
      label={'Sort'}
      value={sortCounties}
      onChange={handleChangeCounties}
      name={'sort-counties'}
      id={'sort-counties'}
    >
      {SORT_COUNTIES.map((value) => {
        return (
          <option key={`sort-${value}`} value={value}>
            {value}
          </option>
        );
      })}
    </SelectWrapper>
  );
});
