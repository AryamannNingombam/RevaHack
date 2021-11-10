import { createSlice, configureStore } from '@reduxjs/toolkit';
import authSlice from './auth.slice';
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
