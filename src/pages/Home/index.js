import { Link, useLoaderData } from 'react-router-dom';
import './styles.scss';

import axios from 'axios';

export const Home = () => {
  const data = useLoaderData();
  console.log(data)
  const estates = data['estates'];
  console.log(data)

  const openAccordion = (e) => {
    e.currentTarget.parentNode.classList.toggle('show');
  };
  
  return (
    <div className='home-page'>
      <div className='first container'>
        <div className='top'>
          <div className='subtitle'>Работаем по всему Дагестану</div>
          <div className='title'>Отдыхайте, как дома</div>
          <div className='description'>Таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание модели развития. </div>
        </div>
        {/* <div className='bottom'>
          <div className='input'>Прибытие</div>
          <div className='input'>Выезд</div>
          <div className='input'>Кто едет?</div>
          <button className='button'>Поиск</button>
        </div> */}
      </div>

      <div className='second container'>
        <div className='list'>
          {
            estates.map((estate) => (
              <a href={`/estates/` + estate['id']} className='block'>
                <img src={process.env.REACT_APP_FILES_BASE_PATH+estate.images[0]} alt='house' />
                <div className='location'>{estate.address['street'] + ' ' + estate.address['address_number'] + ', ' + estate.address['city']}</div>
                {/* <div className='info'>{estate.info}</div> */}
                <div className='price'>{estate.price_night}₽ ночь</div>
              </a>
            ))
          }
        </div>
        <a href='/estates' className='button'>Показать все</a>
      </div>

      <div className='third container'>
        <div className='subtitle'>Наши преимущества</div>
        <div className='title'>Почему выбирают нас?</div>
        <div className='description'>Ваш успех - наша забота в каждой детали</div>
        <div className='list'>
          <div className='block'>
            <svg width={65} height={65} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.5 59.5833C32.5 59.5833 54.1667 48.75 54.1667 32.5V13.5416L32.5 5.41663L10.8333 13.5416V32.5C10.8333 48.75 32.5 59.5833 32.5 59.5833Z" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/><path d="M24.375 32.5L29.7917 37.9167L40.625 27.0834" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className='title'>Надежность</div>
            <div className='content'>Таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание модели развития. </div>
          </div>
          <div className='block'>
            <svg width={65} height={65} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.0833 5.41663H37.9167" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/><path d="M32.5 37.9166L40.625 29.7916" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/><path d="M32.5 59.5833C44.4662 59.5833 54.1667 49.8828 54.1667 37.9167C54.1667 25.9505 44.4662 16.25 32.5 16.25C20.5338 16.25 10.8333 25.9505 10.8333 37.9167C10.8333 49.8828 20.5338 59.5833 32.5 59.5833Z" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className='title'>Экономия времени</div>
            <div className='content'>Таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание модели развития. </div>
          </div>
          <div className='block'>
            <svg width={65} height={65} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.0833 8.125H8.125V27.0833H27.0833V8.125Z" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/><path d="M56.875 8.125H37.9167V27.0833H56.875V8.125Z" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/><path d="M56.875 37.9166H37.9167V56.875H56.875V37.9166Z" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/><path d="M27.0833 37.9166H8.125V56.875H27.0833V37.9166Z" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className='title'>Огромный выбор</div>
            <div className='content'>Таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание модели развития. </div>
          </div>
          <div className='block'>
            <svg width={65} height={65} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.5 59.5833C47.4577 59.5833 59.5833 47.4577 59.5833 32.5C59.5833 17.5422 47.4577 5.41663 32.5 5.41663C17.5423 5.41663 5.41666 17.5422 5.41666 32.5C5.41666 47.4577 17.5423 59.5833 32.5 59.5833Z" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/><path d="M24.6187 24.375C25.2555 22.5649 26.5123 21.0386 28.1665 20.0664C29.8208 19.0941 31.7658 18.7387 33.6569 19.0631C35.5481 19.3875 37.2635 20.3708 38.4992 21.8387C39.7349 23.3066 40.4112 25.1645 40.4083 27.0833C40.4083 32.5 32.2833 35.2083 32.2833 35.2083" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/><path d="M32.5 46.0416H32.5271" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className='title'>Тех. поддержка</div>
            <div className='content'>Таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание модели развития. </div>
          </div>
        </div>
      </div>

      <div className='fourth container'>
        <img src='/images/home/fourth.png' alt='fourth-left' />
        <div className='content'>
          <div className='subtitle'>Немного о нашей компании</div>
          <div className='title'>Узнайте больше о нас и нашем пути к идеальному опыту для вас</div>
          <div className='description'>Мы - крупнейшая онлайн-площадка для размещения и поиска аренды частного жилья по всему Дагестану с 2008 года. Таким образом дальнейшее развитие различных форм деятельности в значительной степени.</div>
          <Link className='button' to='/'>Узнать больше</Link>
        </div>
      </div>

      <div className='fifth container'>
        <div className='content'>
          <div className='subtitle'>Мы готовы ответить на все вопросы</div>
          <div className='title'>Обращайтесь к нам в любое время</div>
          <div className='description'>Наши эксперты всегда на связи, готовые помочь вам 24/7. Будьте уверены, что ваш опыт с нашим сервисом – наш приоритет. Неважно, какие вопросы у вас есть или с какими трудностями вы сталкиваетесь, наша служба поддержки всегда здесь, чтобы обеспечить вас комфортом и уверенностью в каждом этапе вашего путешествия.</div>
          <Link className='button' to='/'>Позвонить сейчас</Link>
        </div>
        <img src='/images/home/fifth.png' alt='fourth-left' />
      </div>

      <div className='sixth container'>
        <div className='top'>
          <div className='subtitle'>FAQ</div>
          <div className='title'>Частые вопросы</div>
          <div className='description'>Если у вас остались вопросы, мы рады на них ответить</div>  
        </div>
        <div className='list'>
        <div className='accordion'>
            <div className='head' onClick={openAccordion}>
              <div className='title'>Вопрос 1</div>
              <div className='toggle-button'></div>
            </div>
            <div className='bottom'>Таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание модели развития. </div>
          </div>
          <div className='accordion'>
            <div className='head' onClick={openAccordion}>
              <div className='title'>Вопрос 2</div>
              <div className='toggle-button'></div>
            </div>
            <div className='bottom'>Таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание модели развития. </div>
          </div>
          <div className='accordion'>
            <div className='head' onClick={openAccordion}>
              <div className='title'>Вопрос 3</div>
              <div className='toggle-button'></div>
            </div>
            <div className='bottom'>Таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание модели развития. </div>
          </div>
          <div className='accordion'>
            <div className='head' onClick={openAccordion}>
              <div className='title'>Вопрос 4</div>
              <div className='toggle-button'></div>
            </div>
            <div className='bottom'>Таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание модели развития. </div>
          </div>
        </div>
      </div>

    </div>
  );
};

Home.loader = async () => {
  try {
    const estates = await axios.get('/estates');
    if (estates.status === 200) {
      if (!estates.data) estates.data = [];
      
      return {
        estates: estates.data,
      };
    }
  } catch {}

  return {
    estates: [],
  };
};  