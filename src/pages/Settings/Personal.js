import { getMe } from 'api/users';
import axios from 'axios';
import { Modal } from 'components/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const Personal = () => {
  const { data } = useSelector(state => state.user);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Модалка');
  const [modalText, setModalText]   = useState('Сообщение');
  const onClose = () => setModalOpen(false);

  const [firstName, setFirstName] = useState(data.firstname);
  const [lastName, setLastName] = useState(data.lastname);

  const onClick = async () => {
    if (!firstName || !lastName) {
      setModalTitle('Ошибка');
      setModalText('Заполните все поля');
      setModalOpen(true);
      return;
    }

    if (firstName === data.firstname && lastName === data.lastname) return;
    
    const res = await axios.patch('/users/update', { firstName, lastName });
    if (res.status === 200) {
      await getMe();
      setModalTitle('Сообщение');
      setModalText('Данные успешно обновлены');
      setModalOpen(true);
    }
  };

  return (
    <div className='personal form'>
      <Modal isVisible={isModalOpen} onClose={onClose} title={modalTitle} text={modalText} />
      <div className='form-title'>Личные данные</div>
      <div className='box'>
        <div className='input-box'>
          <label>Имя:</label>
          <input type='text' placeholder='Ваше имя' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className='input-box'>
          <label>Фамилия:</label>
          <input type='text' placeholder='Ваша фамилия' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <button className='button' onClick={onClick}>Сохранить изменения</button>
      </div>
    </div>
  );
};