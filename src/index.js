import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from 'App';

import { Provider } from 'react-redux';
import { store } from 'store';
import axios from 'axios';

import { Kuro } from 'kuro';
import { addChatAction } from 'store/actions/chat';

const root = ReactDOM.createRoot(document.getElementById('wrapper'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


const connectWS = async () => {
  const state = store.getState();
  const chats = state.chats;

  global.ws = new Kuro(process.env.REACT_APP_WS_URL);

  global.ws.on('new_message', async (payload) => {
    const chatsCopy = {...chats}

    const { chat_id, sender_id, type_id, content } = payload;
    let currentChat = chatsCopy[`chat_id:`+chat_id];

    if (!currentChat) {
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
      return;
    }
    delete chatsCopy[`chat_id:`+chat_id]

    currentChat['last_message_content'] = content;

    const output = {};
    output[`chat_id:${chat_id}`] = currentChat;
    const newObj = {...output, ...chatsCopy};
    store.dispatch(addChatAction(newObj));
  });
};

connectWS();