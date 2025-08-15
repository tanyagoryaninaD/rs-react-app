import MainLayout from '../(main)/MainLayout';
import { About } from '../../components/About/About';
import '../../styles/About.css';

export default function Page() {
  return (
    <MainLayout>
      <About />
    </MainLayout>
  );
}
