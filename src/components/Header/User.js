import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from 'store';
import { logoutAction } from 'store/actions/user';

export const User = () => {
  const { isAuth, data } = useSelector(state => state.user);

  const [isOpen, changeOpen] = useState(false);
  const menuRef = useRef(null);

  const onClick = () => changeOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (event.target.tagName === 'A') changeOpen(false);
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      changeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    store.dispatch(logoutAction());
    window.location.reload();
  };
  
  if (isAuth) {
    return (
      <div className='user'>
        <Link className='search' to='/search'><svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.375 12.375C10.1364 12.375 12.375 10.1364 12.375 7.375C12.375 4.61358 10.1364 2.375 7.375 2.375C4.61358 2.375 2.375 4.61358 2.375 7.375C2.375 10.1364 4.61358 12.375 7.375 12.375Z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.625 13.625L10.9062 10.9062" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
        <div className='right' ref={menuRef}>
          <img src={data.photo} alt='user_photo' onClick={onClick} />
          <div className={isOpen ? 'menu show' : 'menu'} >
            <div className='name'>Иван Иванов</div>
            <div className='border'></div>
            <Link to='/chats'>Сообщения</Link>
            <Link to='/lease'>Сдать жилье</Link> 
            <Link to='/settings'>Настройки</Link>
            <div className='border'></div>
            <div className='logout' onClick={logout}>Выйти</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='bottom'>
        <a href='/' className='search button'>
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.375 12.375C10.1364 12.375 12.375 10.1364 12.375 7.375C12.375 4.61358 10.1364 2.375 7.375 2.375C4.61358 2.375 2.375 4.61358 2.375 7.375C2.375 10.1364 4.61358 12.375 7.375 12.375Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.625 13.625L10.9062 10.9062" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
        <Link className='login button' to='/signin'>Войти</Link>
      </div>
    );
  }
};