import type { ReactNode } from 'react';
import type { NoResultsProps } from '../../../types/interfaces';

export function NoResults(props: NoResultsProps): ReactNode {
  return <div className="no-results">{props.error || 'No results found'}</div>;
}
