import { useContext } from 'react';
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

  return (
    <>
      <details className="details">
        <summary className="summary">
          <p className="summary-title">{country}</p>
          <div className="summary-desc">
            <p>{`ISO: ${iso_code ?? text.notAvailable}`}</p>
            <p>{`Population: ${getPopulation(data, selectedYear) ?? text.notAvailable} (${selectedYear})`}</p>
          </div>
        </summary>
        <div className="drop">
          <table>
            <thead>
              <tr>
                {viewColumns.map((item) => {
                  return <th key={item}>{getHeadColumn(item)}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data
                .map((countryData) => {
                  return (
                    <tr key={countryData.year}>
                      {viewColumns.map((key) => {
                        return (
                          <td key={key}>
                            {countryData[key] ?? text.notAvailable}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </table>
        </div>
      </details>
    </>
  );
}
