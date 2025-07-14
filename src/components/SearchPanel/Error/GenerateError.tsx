import React from 'react';
import type { ErrorState } from '../../../types/interfaces';

class GenerateError extends React.Component<object, ErrorState> {
  constructor(props: object) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  public render() {
    if (this.state.isError) {
      throw new Error('You have successfully generated an error.');
    }

    return (
      <>
        <button onClick={this.handlerClick}>Generate an error</button>
      </>
    );
  }

  private handlerClick = (): void => {
    this.setState({ isError: true });
  };
}

export default GenerateError;
