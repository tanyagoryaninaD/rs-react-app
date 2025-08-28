import { Suspense } from 'react';
import '../styles/App.scss';
import { Spinner } from './components/spinner/spinner';
import Main from './components/main/main';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Main />
    </Suspense>
  );
}

export default App;
