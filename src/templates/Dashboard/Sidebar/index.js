import { Link } from 'react-router-dom';
import './styles.scss';

export const SideBar = () => {
  return (
    <aside>
      <div className='logo'>Kakotel.ru</div>
      
      <nav>
        <Link to='/dashboard/estates'>Объявления</Link>
        <Link to='/dashboard/categories'>Категории</Link>
        <Link to='/dashboard/ameneties'>Удобства</Link>
        <Link to='/dashboard/settings'>Настройки</Link>
      </nav>
    </aside>
  );
};