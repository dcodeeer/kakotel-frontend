const initState = {};

export const ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_CHAT':
      const newChats = action.payload;
      console.log(newChats);
      return {
        ...newChats
      };
    default:
      return state;
  }
};
