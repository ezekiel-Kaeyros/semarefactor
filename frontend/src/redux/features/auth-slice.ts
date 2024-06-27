import { getUserCookies, setUserCookies } from '@/cookies/cookies';
import { createSlice } from '@reduxjs/toolkit';

// Just a boiler plate, this file needs to be updated
export type UserAuth = {
  _id: string;
  email: string;
  token: string;
  credentials: {
    _id: string;
    company: string;
    phone_number_id: string;
    verify_token: string;
    token: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
type AuthState = {
  user: {
    id: string;
    fullName: string;
    email: string;
    token: string;
    role: any;
    createdAt: string;
  };
  userAuth: UserAuth | undefined;
};

const initialState: AuthState = {
  user: {
    id: '',
    email: '',
    token: '',
    fullName: '',
    role: '',
    createdAt: `${new Date()}`,
  },
  userAuth: getUserCookies(),
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userAuth = action.payload;
    },
  },
});

export const { login } = auth.actions;
export default auth.reducer;
