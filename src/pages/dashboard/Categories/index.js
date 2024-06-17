import { useState } from 'react';
import { UploadIcon } from 'components/UploadIcon';
import './styles.scss';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export const DashboardCategories = () => {
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');

  const { categories } = useLoaderData();

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const req = await axios.post('/estates/category', { name, icon });
      if (req.status === 200) {
        console.log('success');
      } else {
        console.log('error')
      }
    } catch (e) {
      console.log('error')
    }
  };

  return (
    <div className='dashboard-categories'>
      <div className='dashboard-title'>Категории</div>

      <div className='add-new'>
        <div className='dashboard-subtitle'>Добавить новое</div>
        <form className='row' onSubmit={onSubmit}>
          <UploadIcon setIcon={setIcon} />
          <input type='text' onChange={(e) => setName(e.target.value)} placeholder='Название' />
          <button className='button'>Добавить</button>
        </form>
      </div>

      <div className='list'>

        <div className='dashboard-subtitle'>Список</div>
        
        <div className='table'>
          <div className='row'>
            <div className='item'>ID</div>
            <div className='item'>Иконка</div>
            <div className='item'>Название</div>
          </div>

          {categories.map((category, i) => (
            <div className='row'>
              <div className='item'>{category.id}</div>
              <div className='item'>
                <img src={process.env.REACT_APP_FILES_BASE_PATH + category.icon} />
              </div>
              <div className='item'>{category.name}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

DashboardCategories.loader = async () => {
  let output = {
    categories: [],
  };

  try {
    const req = await axios.get('/estates/categories');
    if (req.status === 200) {
      if (req.data) {
        output.categories = req.data;
      }
    }
  } catch (e) {}
  
  return output;
};