import { Suspense } from 'react';
import { SearchPanel } from '../components/SearchPanel/SearchPanel';
import MainLayout from './(main)/MainLayout';

export default function Page() {
  return (
    <MainLayout>
      <Suspense>
        <SearchPanel />
      </Suspense>
    </MainLayout>
  );
}
