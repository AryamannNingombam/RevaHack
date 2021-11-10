import axios from 'axios';
import {
    BACKEND_URL
} from '../constants';


export const GetDoctorDetails = () => {
    const {
        token
    } = store.getState().auth;
    if (!token) throw new Error("Token not found!");
    return axios.get(`${BACKEND_URL}/api/doctor/get-doctor-details`, {
        headers: {
            token
        }
    })
}

export const GetAllDoctorsForReport = (_id) => {
    return axios.get(`${BACKEND_URL}/api/doctor/get-all-doctors-for-report/${_id}`)
}

export const GetAllDoctors = () => {
    return axios.get(`${BACKEND_URL}/api/doctor/get-all-doctors`)
}

export const GetDoctorDetailsById = (_id) => {
    return axios.get(`${BACKEND_URL}/api/doctor/get-doctor-details/${_id}`)
}

export const CheckDoctorSignedIn = () => {
    const {
        token
    } = store.getState().auth;
    if (!token) throw new Error("token not found!");
    return axios.get(`${BACKEND_URL}/api/doctor/check-signed-in`)
}

export const SignInDoctor = (body) => {
    return axios.post(`${BACKEND_URL}/api/doctor/sign-in`, body)
}

export const SignUpDoctor = (body) => {
    return axios.post(`${BACKEND_URL}/api/doctor/sign-up`, body);
}

export const ChangeDoctorDetails = (body) => {
    const {
        token
    } = store.getState().auth;
    if (!token) throw new Error("Token not found!");

    return axios.put(`${BACKEND_URL}/api/doctor/change-doctor-details`, body, {
        headers: {
            token
        }
    });
}

export const ChangeDoctorPicture = (body) => {
    const {
        token
    } = store.getState().auth;
    if (!token) throw new Error("Token not found!");

    return axios.put(`${BACKEND_URL}/api/doctor/change-doctor-picture`, body, {
        headers: {
            token
        }
    });
}