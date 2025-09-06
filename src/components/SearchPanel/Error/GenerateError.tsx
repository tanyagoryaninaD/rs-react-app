import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ErrorState } from '../../../types/error-boundary';

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
