import axios from 'axios';
import './styles.scss';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Estate = () => {
  const currentUser = useSelector(state => state.user.data);

  const { estate } = useLoaderData();
  
  return (
    <div className='estate-page container'>
      <div className='pictures'>
        <div className='big'>
          <img src={process.env.REACT_APP_FILES_BASE_PATH + estate.images[0]} />
        </div>
        <div className='small'>
          {
            estate.images.map((v, i) => {
              if (i > 4 || i == 0) return;
              return <img src={process.env.REACT_APP_FILES_BASE_PATH + v} />;
            })
          }
        </div>
      </div>
      
      <div className='information'>
        <div className='left body-3'>
          <div className='description'>
            <div className='subtitle'>Описание</div>
            <p>{estate.description}</p>
          </div>
        </div>
        <div className='right'>
          <div className='box details'>
            <div className='subtitle'>Краткая информация</div>

            <div className='rooms'>
              <div className='item'>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 25V15C2.5 14.337 2.76339 13.7011 3.23223 13.2322C3.70107 12.7634 4.33696 12.5 5 12.5H25C25.663 12.5 26.2989 12.7634 26.7678 13.2322C27.2366 13.7011 27.5 14.337 27.5 15V25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12.5V7.5C5 6.83696 5.26339 6.20107 5.73223 5.73223C6.20107 5.26339 6.83696 5 7.5 5H22.5C23.163 5 23.7989 5.26339 24.2678 5.73223C24.7366 6.20107 25 6.83696 25 7.5V12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 5V12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 22.5H27.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <div className='count'>{estate.rooms}</div>
              </div>
              <div className='item'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L6.5 3.5C6.24356 3.21069 5.88531 3.03157 5.5 3C4.683 3 4 3.683 4 4.5V17C4 17.5304 4.21071 18.0391 4.58579 18.4142C4.96086 18.7893 5.46957 19 6 19H18C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17V12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 5L8 7" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12H22" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 19V21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 19V21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <div className='count'>{estate.showers}</div>
              </div>
              <div className='item'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12H9.01" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 12H15.01" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 16C10.5 16.3 11.2 16.5 12 16.5C12.8 16.5 13.5 16.3 14 16" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 6.3C19.906 7.43567 20.5236 8.77378 20.8 10.2C21.1381 10.3638 21.4233 10.6195 21.6229 10.9378C21.8224 11.2562 21.9282 11.6243 21.9282 12C21.9282 12.3757 21.8224 12.7438 21.6229 13.0622C21.4233 13.3805 21.1381 13.6362 20.8 13.8C20.3683 15.8135 19.2592 17.618 17.6577 18.9125C16.0562 20.207 14.0592 20.9132 12 20.9132C9.94076 20.9132 7.94379 20.207 6.34231 18.9125C4.74083 17.618 3.63171 15.8135 3.2 13.8C2.86186 13.6362 2.57668 13.3805 2.37714 13.0622C2.17761 12.7438 2.07178 12.3757 2.07178 12C2.07178 11.6243 2.17761 11.2562 2.37714 10.9378C2.57668 10.6195 2.86186 10.3638 3.2 10.2C3.61426 8.1705 4.71589 6.34602 6.31902 5.03437C7.92216 3.72271 9.92866 3.00418 12 3C14 3 15.5 4.1 15.5 5.5C15.5 6.9 14.6 8 13.5 8C12.7 8 12 7.6 12 7" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <div className='count'>{estate.baby_rooms}</div>
              </div>
              <div className='item'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7144 7H17.0001V11.2857" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.2857 17H7V12.7143" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 7L7 17" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="2.75" y="2.75" width="18.5" height="18.5" rx="4.25" stroke="black" stroke-width="1.5"/></svg>
                <div className='count'>{estate.area} м²</div>
              </div>
            </div>

            <div className='price'>
              <div className='item'>
                <div className='caption'>Аренда на 1 день:</div>
                <div className='cash'>{estate.price_night}₽ /  ночь</div>
              </div>
              <div className='item'>
                <div className='caption'>Аренда на неделю:</div>
                <div className='cash'>{estate.price_week}₽ /  ночь</div>
              </div>
            </div>

            <div className='write'>
              {estate.owner_id !== currentUser.id ? <a className='button' href={`/chats?id=${estate.owner_id}`}>Написать сообщение</a> : null}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

Estate.loader = async ({ params }) => {
  try {
    const { id } = params;
    const estate = await axios.get(`/estates/getOne?id=${id}`);
    if (estate.status === 200) {
      if (!estate.data) estate.data = [];
      return {
        estate: estate.data,
      };
    }
  } catch {}

  return {
    estate: [],
  };
};  