import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn:false,
    fname:null,
    cnic:null,
    email:null,
    organisation: null,
};

const subadminSlice = createSlice({
    name:"subadminLogin",
    initialState,
    reducers:{
        loginSubadmins:(state,action)=>{
            state.loggedIn = true;
            state.fname = action.payload.fname; //these variables should be same as db fields
            state.cnic=action.payload.cnic;
            state.email=action.payload.email;
            state.organisation=action.payload.organisation;
        },
        logoutSubadmins:(state,action)=>{
            state.loggedIn = false;
            state.fname = null; //these variables should be same as db fields
            state.cnic= null;
            state.email= null;
            state.organisation = null;
        }
    },
});
export default subadminSlice.reducer;
export const {loginSubadmins,logoutSubadmins}=subadminSlice.actions;