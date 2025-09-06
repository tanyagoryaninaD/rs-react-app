import { useState } from 'react';
import type { CountryProps } from '../../../../types/interface';
import * as text from '../../../../utils/textContent';
import { getPopulation } from '../../../../utils/helpers';
import React from 'react';
import Table from './table';

export default React.memo(function Country(props: CountryProps) {
  const {
    name,
    data: { iso_code, data },
    selectedYear,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen(event.currentTarget.open);
  };

  return (
    <details className="details" onToggle={handleToggle}>
      <summary className="summary">
        <p className="summary-title">{name}</p>
        <div className="summary-desc">
          <p>{`ISO: ${iso_code ?? text.notAvailable}`}</p>
          <p>{`Population: ${getPopulation(data, selectedYear) ?? text.notAvailable} (${selectedYear})`}</p>
        </div>
      </summary>
      {isOpen && <Table data={data} />}
    </details>
  );
});
