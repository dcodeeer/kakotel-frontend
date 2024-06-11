const initState = {};

export const ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_CHAT':
      const chats = action.payload;
      return {
        ...chats
      };

    case 'UPDATE_CHAT':
      const { chatId, lastMessage } = action.payload;
      const tempObj = Object.assign(state);

      const chat = tempObj[`chat_id:${chatId}`];
      if (chat) {
        chat['last_message_content'] = lastMessage;
        return {
          ...tempObj
        };
      }
      
    default:
      return state;
  }
};
