import type { ReactNode } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function LoadingIndicator(): ReactNode {
  const t = useTranslations('common');

  return (
    <div className="loader-wrapper">
      <div className="loader">
        <Image
          src="/load.gif"
          alt="Pikachu"
          width={100}
          height={100}
          priority
        />
        <p>{t('loading')}</p>
      </div>
    </div>
  );
}
