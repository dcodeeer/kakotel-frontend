import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMessages } from 'store/actions/messages';

export const ChatBox = ({ user, currentUser }) => {
  const messagesBoxRef = useRef(null);
  const [message, setMessage] = useState('');

  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();

  let chatId;

  const scrollToBottom = () => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (message === '') return;
    const body = {
      to_id: user.id,
      message_type: 'text',
      message_content: message,
    };

    global.ws.emit('message', body);

    setTimeout(scrollToBottom, 150);

    setMessage('');
  };

  const getRemainingScrollDistance = () => {
    const container = messagesBoxRef.current;
    if (container) {
      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      return scrollHeight - scrollTop - clientHeight;
    }
    return 0;
  };

  useEffect(() => {
    const init = async () => {
      let chatId = 0;
      try {
        const chatReq = await axios.get(`/chats/${user.id}`);
        if (chatReq.status === 200) {
          chatId = chatReq.data.chat_id;
          
          const messagesReq = await axios.get(`/chats/messages?chatId=${chatId}`);
          if (messagesReq.status === 200) {
            if (messagesReq.data) {
              dispatch(setMessages(chatId, messagesReq.data));
              setTimeout(scrollToBottom, 1);
            } else {
              //
            }
          }
        }
      } catch {}

    };
    init();
  }, [user]);

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
        <button onClick={() => navigate(-1)} className='arrow'><svg className="ionicon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M244 400L100 256l144-144M120 256h292" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48"/></svg></button>
        <img src={process.env.REACT_APP_FILES_BASE_PATH + user.photo} alt={''} />
        <div className='data'>
          <div className='name'>{user.fullname}</div>
          <div className='status'>В сети</div>
        </div>
      </div>
      <div className='messages' ref={messagesBoxRef}>
        {
          (messages[chatId] ? messages[chatId] : []).map((v, i) => {
            const time = new Date(v.created_at);
            let isFirstMessageForDay = false;

            if (!currentDate) {
              currentDate = time;
            } else if (resetTime(currentDate).getTime() === resetTime(time).getTime()) {
              isFirstMessageForDay = true;
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
      <form className='send' onSubmit={onSubmit}>
          {/* <ReactTextareaAutosize maxRows={3} placeholder='Ваше сообщение...' /> */}
          <input type='text' placeholder='Ваше сообщение...' value={message} onChange={(e) => setMessage(e.target.value)} />         
        <button><svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"/></svg></button>
      </form>
    </div>
  );
};