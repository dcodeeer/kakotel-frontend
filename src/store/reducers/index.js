import { combineReducers } from 'redux';
import { userReducer } from './user';
import { ChatReducer } from './chat';

const rootReducer = combineReducers({
  user: userReducer,
  chat: ChatReducer,
});

export default rootReducer;