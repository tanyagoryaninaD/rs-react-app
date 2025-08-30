import { useCallback, useContext, useMemo, useState } from 'react';
import type { CountryProps } from '../../../types/interface';
import { CountriesCO2Context } from '../../../utils/context';
import * as text from '../../../utils/textContent';
import { getHeadColumn, getPopulation } from '../../../utils/helpers';

export default function Country(props: CountryProps) {
  const context = useContext(CountriesCO2Context);
  const {
    years: { selectedYear },
    viewColumns,
  } = context.menu;
  const {
    country,
    countryData: { iso_code, data },
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = useCallback(
    (event: React.SyntheticEvent<HTMLDetailsElement>) => {
      setIsOpen(event.currentTarget.open);
    },
    []
  );

  const HeadColumns = useMemo(() => {
    return viewColumns.map((item) => {
      return <th key={item}>{getHeadColumn(item)}</th>;
    });
  }, [viewColumns]);

  const Body = useMemo(() => {
    return data
      .map((countryData) => {
        return (
          <tr key={countryData.year}>
            {viewColumns.map((key) => {
              return <td key={key}>{countryData[key] ?? text.notAvailable}</td>;
            })}
          </tr>
        );
      })
      .reverse();
  }, [data, viewColumns]);

  return (
    <>
      <details className="details" onToggle={onToggle}>
        <summary className="summary">
          <p className="summary-title">{country}</p>
          <div className="summary-desc">
            <p>{`ISO: ${iso_code ?? text.notAvailable}`}</p>
            <p>{`Population: ${getPopulation(data, selectedYear) ?? text.notAvailable} (${selectedYear})`}</p>
          </div>
        </summary>
        {isOpen && (
          <div className="drop">
            <table>
              <thead>
                <tr>{HeadColumns}</tr>
              </thead>
              <tbody>{Body}</tbody>
            </table>
          </div>
        )}
      </details>
    </>
  );
}
