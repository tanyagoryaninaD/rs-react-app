import type { ReactNode } from 'react';
import Image from 'next/image';

export function LoadingIndicator(): ReactNode {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <Image src="/load.gif" alt="Pikachu" width={100} height={100} />
        <p>Loading data...</p>
      </div>
    </div>
  );
}
