import { useState, type ReactNode } from 'react';
import type { ErrorState } from '../../../types/interfaces';

export function GenerateError(): ReactNode {
  const [state, setState] = useState<ErrorState>({ isError: false });

  const handlerClick = (): void => {
    setState({ isError: true });
  };

  if (state.isError) {
    throw new Error('You have successfully generated an error.');
  }

  return (
    <>
      <button onClick={handlerClick}>Generate an error</button>
    </>
  );
}
