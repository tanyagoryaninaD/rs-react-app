import { getHeadColumn } from '../../../../utils/helpers';
import * as text from '../../../../utils/textContent';
import type { TableProps } from '../../../../types/interface';
import { useContext, useMemo } from 'react';
import { CountriesCO2Context } from '../../../../utils/context';

export default function Table(props: TableProps) {
  const { data } = props;
  const { viewColumns } = useContext(CountriesCO2Context);

  const createBody = useMemo(() => {
    return data
      .map((data) => {
        return (
          <tr key={data.year}>
            {viewColumns.map((key) => {
              return <td key={key}>{data[key] ?? text.notAvailable}</td>;
            })}
          </tr>
        );
      })
      .reverse();
  }, [data, viewColumns]);

  return (
    <div className="drop">
      <table>
        <thead>
          <tr>
            {viewColumns.map((item) => {
              return <th key={item}>{getHeadColumn(item)}</th>;
            })}
          </tr>
        </thead>
        <tbody>{createBody}</tbody>
      </table>
    </div>
  );
}
