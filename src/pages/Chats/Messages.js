import { useRef } from 'react';

export const Messages = ({ ref, currentUser, messages }) => {
  function resetTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  let currentDate;

  return (
    <div className='messages' ref={ref}>
      {
        messages.map((v, i) => {
          const time = new Date(v.created_at);
          let isFirstMessageForDay = false;

          if (!currentDate) {
            currentDate = time;
          } else if (resetTime(currentDate).getTime() === resetTime(time).getTime()) {
            isFirstMessageForDay = true;
          } else {
            currentDate = time;
          }

          const DateComponent = () => {
            return (
              <div className='dialog-date'>
                <div className='date-content'>{`${resetTime(currentDate).getDate()} ${months[resetTime(currentDate).getMonth()-1]}`}</div>
              </div>
            );
          };

          return (
            <>
              { !isFirstMessageForDay ? <DateComponent /> : null }
              <div className={v.sender_id === currentUser.id ? 'message me': 'message'} key={i}>
                <div className='text'>
                  <span>{v.content}</span>
                  <span className='time'>{`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`}</span>
                </div>
              </div>
            </>
          );
        })
      }
    </div>
  );
};