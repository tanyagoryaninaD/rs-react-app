import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import MainLayout from './(main)/MainLayout';

export default async function Page() {
  return (
    <MainLayout>
      <SearchPanel />
    </MainLayout>
  );
}
