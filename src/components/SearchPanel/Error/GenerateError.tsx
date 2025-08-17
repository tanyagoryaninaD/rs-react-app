import { useState, type ReactNode } from 'react';
import type { ErrorState } from '../../../types/interfaces';
import { useTranslations } from 'next-intl';

export function GenerateError(): ReactNode {
  const t = useTranslations('homePage');
  const [state, setState] = useState<ErrorState>({ isError: false });

  const handlerClick = (): void => {
    setState({ isError: true });
  };

  if (state.isError) {
    throw new Error(t('generateError.description'));
  }

  return (
    <>
      <button onClick={handlerClick}>{t('buttons.generateError')}</button>
    </>
  );
}
