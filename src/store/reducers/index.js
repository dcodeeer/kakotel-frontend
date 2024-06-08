import { combineReducers } from 'redux';
import { userReducer } from './user';
import { ChatReducer } from './chat';
import { messagesReducer } from './messages';

const rootReducer = combineReducers({
  user: userReducer,
  chat: ChatReducer,
  messages: messagesReducer,
});

export default rootReducer;