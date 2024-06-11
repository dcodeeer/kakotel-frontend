const initState = {
  chats: {},
};

export const messagesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const { chatId, message } = action.payload;

      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: [...(state.chats[chatId] || []), message],
        }
      }
    }

    case 'SET_MESSAGES': {
      const { chatId, messages } = action.payload;
      
      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: messages
        }
      }
    }

    default:
      return state;
  }
};