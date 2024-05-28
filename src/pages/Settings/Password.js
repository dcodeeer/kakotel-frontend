import axios from 'axios';
import { Modal } from 'components/Modal';
import { useState } from 'react';

export const Password = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Модалка');
  const [modalText, setModalText]   = useState('Сообщение');
  const onClose = () => setModalOpen(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setModalTitle('Ошибка');
      setModalText('Заполните все поля');
      setModalOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalTitle('Ошибка');
      setModalText('Не совпадают пароли');
      setModalOpen(true);
      return;
    }
    
    axios.patch(
      '/users/changePassword',
      { 'old_password': oldPassword, 'new_password': newPassword },
    ).then((value) => {
      setModalTitle('Сообщение');
      setModalText('Пароль успешно изменен');
      setModalOpen(true);
      e.currentTarget.reset();
      return;
    }).catch((reason) => {
      setModalTitle('Ошибка');
      setModalText('Старый пароль введен не верно');
      setModalOpen(true);
      return;
    });
  };

  return (
    <div className='change-password form'>
      <Modal isVisible={isModalOpen} onClose={onClose} title={modalTitle} text={modalText} />
      <div className='form-title'>Смена пароля</div>
      <form onSubmit={onSubmit} className='box'>
        <div className='input-box'>
          <label>Старый пароль:</label>
          <input type='password' placeholder='Введите старый пароль' onChange={(e) => setOldPassword(e.target.value)} />
        </div>
        <div className='empty'></div>
        <div className='input-box'>
          <label>Новый пароль:</label>
          <input type='password' placeholder='Введите новый пароль' onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className='input-box'>
          <label>Подтвердите пароль:</label>
          <input type='password' placeholder='Подтвердите пароль' onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button className='button'>Сохранить изменения</button>
      </form>
    </div>
  );
};