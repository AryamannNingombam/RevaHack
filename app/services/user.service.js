import axios from 'axios';
import store from '../app/store';
import {
    BACKEND_URL
} from '../constants';


export const GetAllAccessedReportsForUser = () => {
    const {
        token
    } = store.getState().auth;
    if (!token) throw new Error("Token not found!")
    return axios.get(`${BACKEND_URL}/api/user/get-all-accessed-reports-for-user`, {
        headers: {
            token
        }
    })

}




export const GetAllReportsForUser = () => {
    const {
        token
    } = store.getState().auth;
    if (!token) throw new Error("Token not found!")
    return axios.get(`${BACKEND_URL}/api/user/get-all-reports-for-user`, {
        headers: {
            token
        }
    })
}

export const GetAllUsers = () => {
    return axios.get(`${BACKEND_URL}/api/user/get-all-users`, {
        headers: {
            token
        }
    })
}

export const UpdateUserDetails = (body) => {
    const {
        token
    } = store.getState().auth;
    if (!token) throw new Error("Token not found!")
    return axios.put(`${BACKEND_URL}/api/user/update-user-details`, body, {
        headers: {
            token
        }
    })
}

export const GetUserDetails = (_id) => {
    const {
        token
    } = store.getState().auth;
    if (!token) throw new Error('Token not found!');
    return axios.get(`${BACKEND_URL}/api/user/get-user-details`, {
        headers: {
            token,
        },
    });
};



export const CheckSignedIn = () => {
    const {
        token
    } = store.getState().auth;
    return axios.get(`${BACKEND_URL}/api/user/check-signed-in`, {
        headers: {
            token,
        },
    });
};


export const SignInUser = (body) => {
    return axios.post(`${BACKEND_URL}/api/user/sign-in`, body);
};

export const SignUpUser = (body) => {
    return axios.post(`${BACKEND_URL}/api/user/sign-up`, body);
};