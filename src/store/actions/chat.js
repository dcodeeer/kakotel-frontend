export const addChatAction = (chat) => {
  return {
    type: 'ADD_CHAT',
    payload: chat,
  };
};

export const updateChatAction = (chatId, lastMessage) => {
  return {
    type: 'UPDATE_CHAT',
    payload: { chatId, lastMessage },
  };
};