import { UploadIcon } from 'components/UploadIcon';

import './styles.scss';
import { useState } from 'react';

export const DashboardCategories = () => {
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');

  return (
    <div className='dashboard-categories'>
      <div className='dashboard-title'>Категории</div>

      <div className='table'>

        <form className='row'>
          <div></div>
          <UploadIcon setIcon={setIcon} />
          <input type='text' onChange={setName} />
        </form>
        
        <div className='row'>
          <div className='item'>ID</div>
          <div className='item'>Иконка</div>
          <div className='item'>Название</div>
        </div>

        // foreach
      </div>
    </div>
  );
};

DashboardCategories.loader = async () => {
  return {};
};