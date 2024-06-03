import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

import './global.scss';


export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};