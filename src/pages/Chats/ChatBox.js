import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SendForm } from './SendForm';
import axios from 'axios';
import { addMessage, setMessages } from 'store/actions/messages';

export const ChatBox = ({ user, currentUser, chatId }) => {
  const messagesBoxRef = useRef(null);

  const [chatIdState, setChatId] = useState(chatId);

  const { chats } = useSelector(state => state.messages);

  const scrollToBottom = () => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  };

  const dispatch = useDispatch();

  const beforeSend = async () => {
    try {
      const res = await axios.post(`/chats/add?friend_id=${user.id}`);
      if (res.status === 200) {
        setChatId(res.data);
        dispatch(setMessages(chatIdState, []));
        return;
      }
    } catch (e) {}
  };

  const afterSend = () => {
    setTimeout(scrollToBottom, 150);
  };

  function resetTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  let currentDate;

  const navigate = useNavigate();

  return (
    <div className='chat-box'>
      <div className='top'>
        <button onClick={() => navigate('/chats')} className='arrow'><svg className="ionicon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M244 400L100 256l144-144M120 256h292" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48"/></svg></button>
        <img src={process.env.REACT_APP_FILES_BASE_PATH + user.photo} alt={''} />
        <div className='data'>
          <div className='name'>{user.fullname}</div>
          <div className='status'>В сети</div>
        </div>
      </div>
      <div className='messages' ref={messagesBoxRef}>
        {
          (chatIdState ? chats[chatIdState] : []).map((v, i) => {
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
      <SendForm toId={user.id} beforeSend={beforeSend} afterSend={afterSend} />
    </div>
  );
};