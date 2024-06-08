import { Stepper } from 'components/Stepper';
import './styles.scss';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { Pictures } from './Pictures';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Modal } from 'components/Modal';
import { LoaderModal } from 'components/LoaderModal';

export const Lease = () => {
  const navigate = useNavigate('');
  const [isLoad, setLoad] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Модалка');
  const [modalText, setModalText]   = useState('Сообщение');
  const onClose = () => setModalOpen(false);
  
  const data = useLoaderData();

  const [description, setDescription] = useState('');
  const [rooms, setRooms] = useState(0);
  const [showers, setShowers] = useState(0);
  const [babyRooms, setBabyRooms] = useState(0);
  const [priceNight, setPriceNight] = useState(0);
  const [priceWeek, setPriceWeek] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState();
  const [addressNumber, setAddressNumber] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressDistrict, setAddressDistrict] = useState('');


  // const onTapAmenity = (value) => {
  //   const newArr = amenities;
  //   if (!newArr.includes(value)) {
  //     newArr.push(parseInt(value));
  //   } else {
  //     let indexToRemove = newArr.indexOf(parseInt(value));
  //     if (indexToRemove !== -1) {
  //       newArr.splice(indexToRemove, 1);
  //     }
  //   }
    
  //   setAmenities(newArr);
  // };


  const onSubmit = () => {
    if (description === '' || priceNight === 0 || priceWeek === 0 || images.length === 0) {
      setModalOpen(true);
      setModalTitle('Ошибка');
      setModalText('Заполните все поля');
      return;
    }

    const body = {
      'description': description,
      'images': images,
      'amenities': [1],
      'price_night': priceNight,
      'price_week': priceWeek,
      'rooms': rooms,
      'showers': showers,
      'baby_rooms': babyRooms,
      'category_id': 1,
      'address': {
        'address_number': addressNumber,
        'street': addressStreet,
        'city': addressCity,
        'district': addressDistrict,
      },
    };

    setLoad(true);

    axios.post('/estates', body).then(
      value => navigate('/estates/' + value.data['id'])
    ).catch(reason => {
      console.log(reason)
    }).finally(() => setLoad(false));

  };
  
  return (
    <div className='lease-page container'>
      <div className='title'>Сдать жилье</div>

      {isLoad ? <LoaderModal /> : ''}
      <Modal isVisible={isModalOpen} onClose={onClose} title={modalTitle} text={modalText} />

      <Pictures setPictures={setImages} />

      <div className='section address'>
        <div className='subtitle'>Адрес</div>
        <div className='bottom'>
          <input type='text' placeholder='Регион' onChange={(e) => setAddressDistrict(e.target.value)} />
          <input type='text' placeholder='Город' onChange={(e) => setAddressCity(e.target.value)} />
          <input type='text' placeholder='Улица' onChange={(e) => setAddressStreet(e.target.value)} />
          <input type='text' placeholder='Номер дома' onChange={(e) => setAddressNumber(parseInt(e.target.value))} />
        </div>
      </div>

      <div className='section'>
        <div className='subtitle'>Описание жилья</div>
        <ReactTextareaAutosize minRows={3} placeholder='Описание' onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className='section rooms'>
        <div className='subtitle'>Комнаты</div>
        <div className='row'>
          <div className='description'>Спальные:</div>
          <Stepper onChange={(count) => setRooms(count)} />
        </div>
        <div className='row'>
          <div className='description'>Душевые:</div>
          <Stepper onChange={(count) => setShowers(count)} />
        </div>
        <div className='row'>
          <div className='description'>Детские:</div>
          <Stepper onChange={(count) => setBabyRooms(count)} />
        </div>
      </div>

      <div className='section price'>
        <div className='subtitle'>Цены</div>
        <div className='bottom'>
          <input type='number' min={0} placeholder='Цена за ночь' onChange={(e) => setPriceNight(parseInt(e.target.value))} />
          <input type='number' min={0} placeholder='Цена за неделю' onChange={(e) => setPriceWeek(parseInt(e.target.value))} />
        </div>
      </div>

      {/* <div className='section category'>
        <div className='subtitle'>Вариант размещения</div>
        <div className='bottom'>
          <select onChange={(e) => setCategories(parseInt(e.target.value))}>
            {
            
            }
            
          </select>
        </div>
      </div>

      <div className='section amenities'>
        <div className='subtitle'>Удобства</div>
        <div className='bottom'>
          
          {
            data['amenities'].map((value, index) => (
              <div key={index}>{value.name}</div>
            ))
          }
          
        </div>
        </div> */}

      <button className='button' onClick={onSubmit}>Submit</button>
    </div>
  );
};


Lease.loader = async () => {
  try {
    const cats = await axios.get('/estates/categories');
    const ames = await axios.get('/estates/amenities');
    if (cats.status === 200 && ames.status === 200) {
      if (!cats.data) cats.data = [];
      if (!ames.data) ames.data = [];
      
      return {
        categories: cats.data,
        amenities: ames.data,
      };
    }
  } catch {}

  return {
    chats: [],
    amenities: [],
  };
};  