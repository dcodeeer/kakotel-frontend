const initState = {
  "chat_id:3": {
    friend_id: 1,
    friend_firstname: 'John',
    friend_lastname: 'Doe',
    friend_photo: 'http://localhost:4000/uploads/mqlKtO90EOMqnUw_Ln6wca7W7RspeE5fyNUdNnrQt_Ecl3R1o9esRgtOK9zezgKF.jpeg',
    last_message_sender: 1,
    last_message_type: 'text',
    last_message_content: 'Привет',
    new_messages_count: 0,
  },
  "chat_id:1": {
    userId: 1,
    fullname: 'Acccount #1',
    photo: 'http://localhost:4000/uploads/mqlKtO90EOMqnUw_Ln6wca7W7RspeE5fyNUdNnrQt_Ecl3R1o9esRgtOK9zezgKF.jpeg',
    last_message_sender: 1,
    last_message_content: 'Привет',
    new_messages_count: 0,
  },
};

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
