import axios from 'axios';
import { store } from 'store';
import { signInAction } from 'store/actions/user';

export const signIn = async (data) => {
  try {
    const request = await axios.post('/users/login', data);
    if (request.status === 200) {
      localStorage.setItem('access_token', request.data['token']);
      setCookie("token", request.data['token'], 365);
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
      
      await getMe();
    }
  } catch {}
  return false;
};

export const signUp = async (data) => {
  try {
    const request = await axios.post('/users/signup', data);
    if (request.status === 200) {
      localStorage.setItem('access_token', request.data['token']);
      setCookie("token", request.data['token'], 365);
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
      
      await getMe();
    }
  } catch {}
  return false;
};

export const getMe = async () => {
  const userRequest = await axios.get('/users/getMe');
  if (userRequest.status === 200) {
    let { id, fullname, description, photo } = userRequest.data;
    if (photo === null) {
      photo = '/images/default.png'
    } else {
      photo = process.env.REACT_APP_FILES_BASE_PATH + photo;
    }
    store.dispatch(signInAction({ isAuth: true, data: { id, fullname, description, photo } }));
    return true;
  }
};

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}