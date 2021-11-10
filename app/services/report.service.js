import store from "../app/store";
import axios from "axios";
import { BACKEND_URL } from "../constants";

export const AddReport = async (body) => {
  const { token } = store.getState().auth;
  if (!token) throw new Error("Token not found!");

  return await axios.post(`${BACKEND_URL}/api/report/add-report`, body, {
    headers: {
      token,
    },
  });
};

export const DeleteReport = (body) => {
  const { token } = store.getState().auth;
  if (!token) throw new Error("Token not found!");
  return axios.post(`${BACKEND_URL}/api/report/delete-report`, body, {
    headers: {
      token,
    },
  });
};

export const GetReportDetails = async (_id) => {
  const { token } = store.getState().auth;
  if (!token) throw new Error("Token not found!");
  return await axios.get(`${BACKEND_URL}/api/report/get-report/${_id}`, {
    headers: {
      token,
    },
  });
};

export const GetAllUsersForReport = (_id) => {
  const { token } = store.getState().auth;
  if (!token) throw new Error("Token not found!");

  return axios.get(
    `${BACKEND_URL}/api/report/get-all-users-for-report/${_id}`,
    {
      headers: {
        token,
      },
    }
  );
};

export const GiveReportAccessToUser = async (body) => {
  const { token } = store.getState().auth;
  if (!token) throw new Error("Token not found!");
  await axios
    .put(`${BACKEND_URL}/api/report/give-report-access-to-user`, body, {
      headers: {
        token,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
