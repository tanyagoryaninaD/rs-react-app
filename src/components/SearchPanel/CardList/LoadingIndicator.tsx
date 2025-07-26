import type { ReactNode } from 'react';

export function LoadingIndicator(): ReactNode {
  return (
    <div className="table-loader">
      <div className="loader-spinner"></div>
      Loading data...
    </div>
  );
}
