import { Link, Navigate, redirect, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ChatBox } from './ChatBox';
import { store } from 'store';
import { addChatAction } from 'store/actions/chat';

import './styles.scss';
import { setMessages } from 'store/actions/messages';

export const Chats = () => {
  const currentUser = useSelector(state => state.user.data);
  const chats = useSelector(state => state.chat);
  
  const { user, chatId } = useLoaderData();

  if (user) {
    if (user.id === currentUser.id) {
      return <Navigate to={'/chats'} />
    }
  }

  function truncateText(text, maxLength) {
    if (!text) return;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  const chatsLen = Object.keys(chats).length;

  return (
    <div className='chats-page container'>
      <div className='left'>
        {
          chatsLen > 0 ?
          Object.keys(chats).map((key, index) => (
            <Link to={`/chats?id=${chats[key].friend_id}`} className='item' key={index}>
              <img src={process.env.REACT_APP_FILES_BASE_PATH + chats[key].friend_photo} alt={chats[key].friend_firstname} />
              <div className='data'>
                <div className='name'>{chats[key].friend_fullname}</div>
                <div className='last-message'>{chats[key].last_message_sender === currentUser.id ? 'Вы: ' : ''} {truncateText(chats[key].last_message_content, 18)}</div>
              </div>
              {chats[key].new_messages_count ? <div className='new'>{chats[key].new_messages_count}</div> : null}
            </Link>
          )) : <div>нет активных чатов</div>
        }
      </div>
      {user ? <ChatBox user={user} currentUser={currentUser} chatId={chatId} /> : <div className='select-chat'><div className='content'>Выберите чат</div></div> }
    </div>  
  );
};

Chats.loader = async ({ request }) => {
  try {
    let output = {};

    const chats = await axios.get('/chats');
    if (chats.status === 200) {
      if (!chats.data) {
        chats.data = [];
      }

      const newChats = {};
      for (let i = 0; i < chats.data.length; i++) {
        const element = chats.data[i];
        const key = 'chat_id:' + element['id'];
        newChats[key] = element;
      }
      store.dispatch(addChatAction(newChats));
    }

    const userId = new URL(request.url).searchParams.get('id');
    if (parseInt(userId) > 0) {
      const user = await axios.get(`/users?id=${userId}`);
      if (user.status === 200) {
        if (user.data) {
          output.user = user.data;

          //
          try {
            const chatReq = await axios.get(`/chats/${user.data.id}`);
            if (chatReq.status === 200) {
              const chatId = chatReq.data.chat_id;
              
              const messagesReq = await axios.get(`/chats/messages?chatId=${chatId}`);
              if (messagesReq.status === 200) {
                output.chatId = chatId;

                if (messagesReq.data) {
                  store.dispatch(setMessages(chatId, messagesReq.data));
                }
              }
            }
          } catch {
            output.chatId = 0;
          }
          ///


        }
      }
    }

    return output;
  } catch (e) {
    return {

    };
  }

  return redirect('/');
};  