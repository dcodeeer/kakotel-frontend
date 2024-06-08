import { getMe } from 'api/users';
import axios from 'axios';
import { Modal } from 'components/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTextareaAutosize from 'react-textarea-autosize';

export const Personal = () => {
  const { data } = useSelector(state => state.user);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Модалка');
  const [modalText, setModalText]   = useState('Сообщение');
  const onClose = () => setModalOpen(false);

  const [fullname, setFullname] = useState(data.fullname);
  const [description, setDescription] = useState(data.description);

  const onClick = async () => {
    if (!fullname) {
      setModalTitle('Ошибка');
      setModalText('Заполните все поля');
      setModalOpen(true);
      return;
    }

    if (fullname === data.fullname && description === data.description) return;
    
    const res = await axios.patch('/users/update', { fullname, description });
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
          <label>Полное имя:</label>
          <input type='text' placeholder='Ваше имя' value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>
        <div className='input-box'>
          <label>О себе:</label>
          <ReactTextareaAutosize minRows={2} placeholder='О себе' value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
        </div>
        <button className='button' onClick={onClick}>Сохранить изменения</button>
      </div>
    </div>
  );
};