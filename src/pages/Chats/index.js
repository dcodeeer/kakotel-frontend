import { Link, Navigate, redirect, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ChatBox } from './ChatBox';
import { store } from 'store';
import { addChatAction } from 'store/actions/chat';

import './styles.scss';

export const Chats = () => {
  const currentUser = useSelector(state => state.user.data);
  const chats = useSelector(state => state.chat);
  
  const { user } = useLoaderData();

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

  return (
    <div className='chats-page container'>
      <div className='left'>
        {
          Object.keys(chats).map((key, index) => (
            <Link to={`/chats?id=${chats[key].friend_id}`} className='item' key={index}>
              <img src={process.env.REACT_APP_FILES_BASE_PATH + chats[key].friend_photo} alt={chats[key].friend_firstname} />
              <div className='data'>
                <div className='name'>{chats[key].friend_fullname}</div>
                <div className='last-message'>{chats[key].last_message_sender === currentUser.id ? 'Вы: ' : ''} {truncateText(chats[key].last_message_content, 18)}</div>
              </div>
              {chats[key].new_messages_count ? <div className='new'>{chats[key].new_messages_count}</div> : null}
            </Link>
          ))
        }
      </div>
      {user ? <ChatBox user={user} currentUser={currentUser} /> : null }
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
        }
      }
    }

    return output;
  } catch (e) {
    console.log(e)
  }

  return redirect('/');
};  