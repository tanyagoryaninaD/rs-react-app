import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Main(): ReactNode {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
