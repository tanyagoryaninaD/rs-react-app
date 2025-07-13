import React from 'react';
import type { EventsForm } from '../../../types/interfaces';

class SearchError extends React.Component<EventsForm> {
  public render() {
    return (
      <>
        <button onClick={this.handlerClick}>Generate an error</button>
      </>
    );
  }

  private handlerClick = async (): Promise<void> => {
    this.props.onChange('0');
    this.props.onSearch('0');
  };
}

export default SearchError;
