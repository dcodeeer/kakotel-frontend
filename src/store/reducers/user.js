const initState = {
  isAuth: false,
  data: {
    id: null,
    fullname: null,
    description: null,
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
          fullname: action.payload.data.fullname,
          description: action.payload.data.description,
          photo: action.payload.data.photo,
          admin: action.payload.data.admin,
        }
      };
    case 'LOGOUT':
      return initState;
    default:
      return state;
  }
};