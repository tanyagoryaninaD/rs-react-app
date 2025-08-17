import { Header } from '../../../components/components/Header';
import StoreProvider from './StoreProvider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <Header />
      {children}
    </StoreProvider>
  );
}
