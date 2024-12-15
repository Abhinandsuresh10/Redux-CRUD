import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
    adminInfo: Cookies.get('adminInfo') ? JSON.parse(Cookies.get('adminInfo')) : null,
}


const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.adminInfo = action.payload;
            Cookies.set('adminInfo', JSON.stringify(action.payload))
        },
        Adlogout: (state) => {
            state.adminInfo = null;
            Cookies.remove('adminInfo')
        },
    },
});

export const {setCredentials, Adlogout} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;