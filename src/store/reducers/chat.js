const initState = {};

export const ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_CHAT':
      const newChats = action.payload;
      return {
        ...newChats
      };
    default:
      return state;
  }
};
