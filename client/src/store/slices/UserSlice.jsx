import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn:false,
    fname:null,
    lname:null,
    phone:null,
    cnic:null,
    email:null
};

const userSlice = createSlice({
    name:"userLogin",
    initialState,
    reducers:{
        loginUsers:(state,action)=>{
            state.loggedIn = true;
            state.fname = action.payload.fname; //these variables should be same as db fields
            state.lname = action.payload.lname;
            state.phone=action.payload.phone;
            state.cnic=action.payload.cnic;
            state.email=action.payload.email;
        },
        logoutUsers:(state,action)=>{
            state.loggedIn = false;
            state.fname = null; //these variables should be same as db fields
            state.lname = null;
            state.phone= null;
            state.cnic= null;
            state.email= null;
        }
    },
});
export default userSlice.reducer;
export const {loginUsers,logoutUsers}=userSlice.actions;