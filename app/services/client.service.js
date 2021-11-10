import axios from 'axios';
import { BACKEND_URL } from '../constants';

export const GetClientDetails = (_id) => {
  const { token } = store.getState().auth;
  if (!token) throw new Error('Token not found!');
  return axios.get(`${BACKEND_URL}/api/client/get-client-details/${_id}`, {
    headers: {
      token,
    },
  });
};

export const CheckSignedIn = () => {
  const { token } = store.getState().auth;
  return axios.get(`${BACKEND_URL}/api/client/check-signed-in`, {
    headers: {
      token,
    },
  });
};

export const SignInClient = (body) => {
  return axios.post(`${BACKEND_URL}/api/client/sign-in`, body);
};

export const SignUpClient = (body) => {
  return axios.post(`${BACKEND_URL}/api/client/sign-up`, body);
};
