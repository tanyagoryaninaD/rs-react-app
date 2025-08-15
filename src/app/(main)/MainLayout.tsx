import { Header } from '../../components/Header';
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
