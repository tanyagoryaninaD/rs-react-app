import type { ReactNode } from 'react';

export function LoadingIndicator(): ReactNode {
  return (
    <div className="loader">
      <p>Loading data...</p>
      <img src="public/load.gif" alt="Pikachu" />
    </div>
  );
}
