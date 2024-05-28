export const signInAction = (userData) => {
  return {
    type: 'SIGNIN',
    payload: userData
  };
};

export const logoutAction = () => {
  return {
    type: 'LOGOUT'
  };
};