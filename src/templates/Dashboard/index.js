import { Outlet } from 'react-router-dom';
import { SideBar } from './Sidebar';

import './styles.scss';

export const Dashboard = () => {
  return (
    <>
      <div className='dashboard'>
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};