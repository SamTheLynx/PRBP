import { configureStore } from '@reduxjs/toolkit';
import UserSlice, { loginUsers } from './slices/UserSlice';
import AdminSlice, {loginAdmins} from './slices/AdminSlice';
import SubAdminSlice, {loginSubadmins} from './slices/SubAdminSlice';
import { loadState, saveState } from './LocalStorage'

// Load persisted state
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: UserSlice,
    admin: AdminSlice,
    subadmin: SubAdminSlice
  },
  preloadedState,
});

// Save state to local storage on every state change
store.subscribe(() => {
  saveState(store.getState());
});

// Load user data from local storage and set it in Redux store
const userData = localStorage.getItem('user');
if (userData) {
  store.dispatch(loginUsers(JSON.parse(userData)));
}

const adminData=localStorage.getItem('admin');
if (adminData){
    store.dispatch(loginAdmins(JSON.parse(adminData)));
}

const subadminData=localStorage.getItem('subadmin');
if (subadminData){
    store.dispatch(loginSubadmins(JSON.parse(subadminData)));
}

export default store;