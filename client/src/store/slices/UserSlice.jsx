import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn:false,
    fname:null,
    lname:null,
    phone:null,
    cnic:null,
    email:null,
    designation:null,
    organisation:null
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
            state.designation=action.payload.designation;
            state.email=action.payload.email;
            state.organisation = action.payload.organisation;
        },
        logoutUsers:(state,action)=>{
            state.loggedIn = false;
            state.fname = null; //these variables should be same as db fields
            state.lname = null;
            state.phone= null;
            state.cnic= null;
            state.email= null;
            state.designation=null;
            state.organisation = null;
        }
    },
});
export default userSlice.reducer;
export const {loginUsers,logoutUsers}=userSlice.actions;