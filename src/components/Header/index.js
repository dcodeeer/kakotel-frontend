import { Link } from 'react-router-dom';
import './styles.scss';
import { User } from './User';

export const Header = () => {
  return (
    <header>
      <div className='container'>
        <Link className='logo' to='/'>
          <img src='/images/logo.png' alt='logo' />
          <span>Logo</span>
        </Link>
        
        <nav>
          <Link to='/'>Главная</Link>
          <Link to='/'>Преимущества</Link>
          <Link to='/'>О нас</Link>
          <Link to='/'>Поддержка</Link>
          <Link to='/'>FAQ</Link>
        </nav>
        
        <User />
      </div>
    </header>
  );
};