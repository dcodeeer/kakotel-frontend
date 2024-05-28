const initState = [];

export const ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD':
      const newMessages = action.payload;
      return [
        ...initState,
        ...newMessages
      ];
    default:
      return state;
  }
};
