import { useContext } from 'react';
import type { CountryProps } from '../../../types/interface';
import { CountriesCO2Context } from '../../../utils/context';
import * as text from '../../../utils/textContent';
import { getHeadColumn } from '../../../utils/helpers';

export default function Country(props: CountryProps) {
  const context = useContext(CountriesCO2Context);

  const getLatestPopulation = () => {
    const populations = props.countryData.data.filter(
      (item) => item.year === context.years.selectedYear
    )[0].population;

    return populations;
  };

  return (
    <>
      <details className="details">
        <summary className="summary">
          <p className="summary-title">{props.country}</p>
          <div className="summary-desc">
            <p>{`ISO: ${props.countryData.iso_code ?? text.notAvailable}`}</p>
            <p>{`Population: ${getLatestPopulation() ?? text.notAvailable} (${context.years.selectedYear})`}</p>
          </div>
        </summary>
        <div className="drop">
          <table>
            <thead>
              <tr>
                {context.viewColumns.map((item) => {
                  return <th key={item}>{getHeadColumn(item)}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {props.countryData.data
                .map((countryData) => {
                  return (
                    <tr key={countryData.year}>
                      {context.viewColumns.map((key) => {
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
