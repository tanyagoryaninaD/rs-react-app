import React from 'react';
import type { SearchErrorProps } from '../../../types/interfaces';

class SearchError extends React.Component<SearchErrorProps> {
  public render() {
    console.log(this.props.error);
    return <></>;
  }
}

export default SearchError;
