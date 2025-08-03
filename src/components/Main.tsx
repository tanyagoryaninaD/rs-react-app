import { useEffect, type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Flyout } from './components/Flyout';
import { useDispatch, useSelector } from 'react-redux';
import type { MyStore } from '../types/interfaces';
import { getLocalStorage } from '../utils/store';

export function Main(): ReactNode {
  const dispatch = useDispatch();
  const stateSize = useSelector((state: MyStore) => state.selectedItems.size);

  useEffect(() => {
    dispatch(getLocalStorage());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      {stateSize ? <Flyout /> : ''}
    </>
  );
}
