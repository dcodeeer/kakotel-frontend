import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from 'App';

import { Provider } from 'react-redux';
import { store } from 'store';
import { Kuro } from 'kuro';
import { updateChatAction } from 'store/actions/chat';
import { addMessage, setMessages } from 'store/actions/messages';

const root = ReactDOM.createRoot(document.getElementById('wrapper'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

const connectWS = async () => {
  global.ws = new Kuro(process.env.REACT_APP_WS_URL);

  global.ws.on('new_message', async (payload) => {
    const { messages } = store.getState();
    
    const { id, chat_id, sender_id, type_id, content, created_at } = payload;

    console.log(messages);

    if (messages.chats[chat_id]) {
      store.dispatch(updateChatAction(chat_id, content));
      store.dispatch(addMessage(chat_id, payload));
    } else {
      store.dispatch(updateChatAction(chat_id, content));
      store.dispatch(setMessages(chat_id, [payload]));
    }

  });
};

connectWS();