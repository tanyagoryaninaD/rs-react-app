import type { CountryProps } from '../../../types/interface';
import * as text from '../../../utils/textContent';

export default function Country(props: CountryProps) {
  console.log('🚀 ~ Country ~ props:');
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
                <th>Year</th>
                <th>Population</th>
                <th>Co2</th>
                <th>Co2 per capita</th>
              </tr>
            </thead>
            <tbody>
              {props.countryData.data
                .map((item) => {
                  return (
                    <tr key={item.year}>
                      <td>{item.year ?? text.notAvailable}</td>
                      <td>{item.population ?? text.notAvailable}</td>
                      <td>{item.co2 ?? text.notAvailable}</td>
                      <td>{item.co2_per_capita ?? text.notAvailable}</td>
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
