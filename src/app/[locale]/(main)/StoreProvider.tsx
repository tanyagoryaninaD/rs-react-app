'use client';

import { Provider } from 'react-redux';
import ErrorBoundary from '../../../components/SearchPanel/Error/ErrorBoundary';
import store from '../../../store/store';
import { useTranslations } from 'next-intl';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('homePage');
  const context = {
    title: t('generateError.title'),
    description: t('generateError.description'),
    button: t('buttons.back'),
  };

  return (
    <ErrorBoundary context={context}>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  );
}
