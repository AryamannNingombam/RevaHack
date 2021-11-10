import store from '../app/store';
import axios from 'axios';
import { BACKEND_URL } from '../constants';

export const GetAllReports = () => {
  const { token } = store.getState().auth;
  if (!token) throw new Error('No token found');
  return axios.get(`${BACKEND_URL}/api/report/get-all-reports`, {
    headers: {
      token,
    },
  });
};

export const GetReport = (_id) => {
  const { token } = store.getState().auth;
  if (!token) throw new Error('No token found');
  return axios.get(`${BACKEND_URL}/api/report/get-report/${_id}`, {
    headers: {
      token,
    },
  });
};

export const GetReportsForUser = () => {
  const { token } = store.getState().auth;
  if (!token) throw new Error('No token found');
  return axios.get(`${BACKEND_URL}/api/report/get-reports-for-user`, {
    headers: {
      token,
    },
  });
};

export const GetAllReportsByDoctor = () => {
  const { token } = store.getState().auth;
  if (!token) throw new Error('No token found');
  return axios.get(`${BACKEND_URL}/api/report/get-all-reports-by-doctor`, {
    headers: {
      token,
    },
  });
};

export const DeleteReport = (body) => {
  const { token } = store.getState().auth;
  if (!token) throw new Error('No token found');
  return axios.post(`${BACKEND_URL}/api/report/delete-report/`, body, {
    headers: {
      token,
    },
  });
};

export const AddReport = (data) => {
  const { token } = store.getState().auth;
  if (!token) throw new Error('No token found');
  return axios.post(`${BACKEND_URL}/api/report/add-report`, data);
};
