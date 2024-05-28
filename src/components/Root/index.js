import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header';

import './global.scss';


export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};