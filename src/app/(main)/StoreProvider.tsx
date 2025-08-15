'use client';

import { Provider } from 'react-redux';
import ErrorBoundary from '../../components/SearchPanel/Error/ErrorBoundary';
import store from '../../store/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  );
}
