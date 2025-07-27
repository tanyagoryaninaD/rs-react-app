import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import gif from '../../../public/not-found.gif';

export function NotFound(): ReactNode {
  const navigate = useNavigate();

  const handlerClick = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <h2>Oops! I didn&apos;t find anything at this URL.</h2>
      <button onClick={handlerClick}>Back to Home</button>
      <img src={gif} alt="not found" />
    </div>
  );
}
