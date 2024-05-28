import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from 'App';

import { Provider } from 'react-redux';
import { store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('wrapper'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


const connect = () => {
  global.ws = new WebSocket("ws://localhost:4000/ws");

  global.ws.onopen = function(e) {
    // socket.send("Меня зовут Джон");
  };

  global.ws.onmessage = function(event) {
    console.log(`[message] Данные получены с сервера: ${event.data}`);
  };

  global.ws.onclose = function(event) {
    setInterval(() => connect(), 5000);
  };

  global.ws.onerror = function(error) {
    console.log(error)
  };
};

connect();