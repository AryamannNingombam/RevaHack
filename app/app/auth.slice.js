import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  GetUserDetails,
  SignInUser,
  SignUpUser,
  UpdateUserDetails,
} from '../services/user.service';

export const SignUpThunk = createAsyncThunk(
  'auth/signup-user',
  async (body, { rejectWithValue }) => {
    return SignUpUser(body)
      .then((response) => response.data)
      .catch((error) => {
        console.log('error');
        console.log(error);
        return rejectWithValue(error.response.data);
      });
  },
);

export const LoginThunk = createAsyncThunk(
  '/auth/login-user',
  async (body, { rejectWithValue }) => {
    return SignInUser(body)
      .then((response) => response.data)
      .catch((error) => {
        console.log('error');
        console.log(error);
        return rejectWithValue(error);
      });
  },
);
export const EditProfileThunk = createAsyncThunk(
  '/api/user/update-user-details',
  async (body, { rejectWithValue }) => {
    console.log(body);
    return UpdateUserDetails(body)
      .then((response) => response.data)
      .catch((error) => {
        console.log('error');
        console.log(error);
        return rejectWithValue(error);
      });
  },
);

export const GetUserDetailsThunk = createAsyncThunk(
  '/api/user/get-user-details',
  async (body, { rejectWithValue }) => {
    return GetUserDetails(body)
      .then((response) => response.data)
      .catch((error) => {
        console.log('error');
        console.log(error);
        return rejectWithValue(error);
      });
  },
);

const initialState = {
  token: null,
  userData: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userData = null;
      state.token = null;
      console.log(state);
    },
    refresh: (state, action) => {
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      console.log(state);
    },
  },
  extraReducers: {
    [LoginThunk.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    [LoginThunk.rejected]: (state, action) => {
      console.log('Error signing in!');
      state = initialState;
    },
    [GetUserDetailsThunk.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
    },
    [GetUserDetailsThunk.rejected]: (state, action) => {
      console.log('Error getting details!');
    },
  },
});

export default slice.reducer;

export const { logout, refresh } = slice.actions;
