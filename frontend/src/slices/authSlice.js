import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            Cookies.set('userInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userInfo = null;
            Cookies.remove('userInfo')
        },
    },
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;