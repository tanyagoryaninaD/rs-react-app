import React from 'react';
import Loader from '../../../server/Loader';
import type { EventsForm } from '../../../types/interfaces';

class SearchError extends React.Component<EventsForm> {
  private readonly server: Loader;

  constructor(props: EventsForm) {
    super(props);
    this.server = Loader.getInstance();
  }

  public render() {
    return (
      <>
        <button onClick={this.handlerClick}>Generate an error</button>
      </>
    );
  }

  private handlerClick = async (): Promise<void> => {
    try {
      this.props.onChange('0');
      await this.server.getPokemon('0');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        this.props.onSearch(error);
      }
    }
  };
}

export default SearchError;
