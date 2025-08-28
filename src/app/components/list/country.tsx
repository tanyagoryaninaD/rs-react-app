import { useContext } from 'react';
import type { CountryProps } from '../../../types/interface';
import { CountriesCO2Context } from '../../../utils/context';
import * as text from '../../../utils/textContent';
import { getHeadColumn } from '../../../utils/helpers';

export default function Country(props: CountryProps) {
  const context = useContext(CountriesCO2Context);

  const getLatestPopulation = () => {
    const populations = props.countryData.data.filter(
      (item) => !!item.population
    );

    if (!populations.length) {
      return null;
    }

    const latest = populations.sort((a, b) => {
      if (b.year && a.year) {
        return b.year - a.year;
      }
      return 0;
    })[0];

    return latest.population || null;
  };

  return (
    <>
      <details className="details">
        <summary className="summary">
          <p className="summary-title">{props.country}</p>
          <div className="summary-desc">
            <p>{`ISO: ${props.countryData.iso_code ?? text.notAvailable}`}</p>
            <p>
              {`Population: ${getLatestPopulation() ?? text.notAvailable} (latest)`}
            </p>
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
