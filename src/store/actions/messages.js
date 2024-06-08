export const addMessage = (chatId, message) => ({
  type: 'ADD_MESSAGE',
  payload: { chatId, message }
});

export const setMessages = (chatId, messages) => ({
  type: 'SET_MESSAGES',
  payload: { chatId, messages }
});