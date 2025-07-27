import type { ReactNode } from 'react';
import type { NoResultsProps } from '../../../types/interfaces';
import gif from '../../../../public/not-results.gif';

export function NoResults(props: NoResultsProps): ReactNode {
  return (
    <div className="no-results">
      {props.error || 'No results found'}
      <img src={gif} alt="Pikachu" />
    </div>
  );
}
