import React from 'react';
import type { NoResultsProps } from '../../../types/interfaces';

class NoResults extends React.Component<NoResultsProps> {
  render() {
    const { error } = this.props;
    return <div className="no-results">{error || 'No results found'}</div>;
  }
}

export default NoResults;
