const initState = {
  isAuth: false,
  data: {
    id: null,
    firstname: null,
    lastname: null,
    photo: null,
  },
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        isAuth: true,
        data: {
          id: action.payload.data.id,
          firstname: action.payload.data.firstname,
          lastname: action.payload.data.lastname,
          photo: action.payload.data.photo
        }
      };
    case 'LOGOUT':
      return initState;
    default:
      return state;
  }
};