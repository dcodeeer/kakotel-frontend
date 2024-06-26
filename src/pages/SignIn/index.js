import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

import { signIn } from 'api/users';
import { Modal } from 'components/Modal';


export const SignIn = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Модалка');
  const [modalText, setModalText]   = useState('Сообщение');
  const onClose = () => setModalOpen(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const isAuth = await signIn({ email, password });
    if (isAuth) {
      // redirect to profile
    } else {
      setModalOpen(true);
      setModalTitle('Ошибка');
      setModalText('Неверные данные');
    }
  };

  const isDisabled = (email === '') || (password === '');

  return (
    <div className='signin-page container'>
      <Modal isVisible={isModalOpen} onClose={onClose} title={modalTitle} text={modalText} />
      <div className='box'>

        <div className='tabs'>
          <Link className='tab active' to='/signin'>Вход</Link>
          <div className='border'></div>
          <Link className='tab' to='/signup'>Регистрация</Link>
        </div>

        <form onSubmit={onSubmit} autoComplete='off'>
          <div className='title'>Добро пожаловать!</div>
          <div className='subtitle'>Войдите в аккаунт чтобы продолжить</div>

          <div className='input'>
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M320 254.27c-4.5 51-40.12 80-80.55 80s-67.34-35.82-63.45-80 37.12-80 77.55-80 70.33 36 66.45 80z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M319.77 415.77c-28.56 12-47.28 14.5-79.28 14.5-97.2 0-169-78.8-160.49-176s94.31-176 191.51-176C381 78.27 441.19 150 432.73 246c-6.31 71.67-52.11 92.32-76.09 88.07-22.56-4-41.18-24.42-37.74-63.5l8.48-96.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
            <input type='email' name='email' placeholder='Введите почту' onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='input'>
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z"/></svg>
            <input type='password' name='password' placeholder='Введите пароль' onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className='button' disabled={isDisabled}>Войти</button>
        </form>

      </div>
    </div>
  );
};