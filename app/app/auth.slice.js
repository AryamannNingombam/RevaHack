import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SignInUser, SignUpUser } from '../services/user.service';

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
    console.log(body);
    return SignInUser(body)
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
      state = initialState;
      console.log('LOGGGGOUT');
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
  },
});

export default slice.reducer;

export const { logout } = slice.actions;
