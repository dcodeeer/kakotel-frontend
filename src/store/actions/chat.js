export const addChatAction = (chat) => {
  return {
    type: 'ADD_CHAT',
    payload: chat,
  };
};