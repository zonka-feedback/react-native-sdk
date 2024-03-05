import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginState: '',
};
const dataManagerSlice = createSlice({
  name: 'zonkaSdk_dataManager',
  initialState,
  reducers: {
    setLoginState: (state, { payload }) => {
      return { ...state, loginState: payload };
    },
  },
});
export const { setLoginState } = dataManagerSlice.actions;
export const dataManagerReducer = dataManagerSlice.reducer;
