import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn:false,
    email:null
};

const adminSlice = createSlice({
    name:"adminLogin",
    initialState,
    reducers:{
        loginAdmins:(state,action)=>{
            state.loggedIn = true;
            state.email=action.payload.email;
        },
        logoutAdmins:(state,action)=>{
            state.loggedIn = false;
            state.email= null;
        }
    },
});
export default adminSlice.reducer;
export const {loginAdmins,logoutAdmins}=adminSlice.actions;