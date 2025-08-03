import type { ReactNode } from 'react';
import gif from '../../../assets/load.gif';

export function LoadingIndicator(): ReactNode {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <img src={gif} alt="Pikachu" />
        <p>Loading data...</p>
      </div>
    </div>
  );
}
