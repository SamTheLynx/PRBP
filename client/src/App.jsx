import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import OptionPage from './pages/option'
import SubmissionPage from './pages/SubmissionPage'
import BillingPage from './pages/BillingPage'
import AboutUs from "./pages/AboutUs/AboutUs"
import Contact from './pages/contact'
import AdminLogin from './pages/AdminLogin'
import SubAdminLogin from './pages/SubAdminLogin'
import Reset from './pages/Reset'
import Controller from './pages/Controller';
import SubAdminSignup from './pages/SubAdminSignup'
import Account from './pages/Account';
import ApplicationForms from './pages/SubAdminPortal/ApplicationForms';
import ManageSubAdmin from './pages/AdminPortal/ManageSubAdmin'
import TrackFormStatus from './pages/Tracking/Tracking';
import Procedure from './pages/Procedure/Procedure';
import UserCertificateList from './pages/UserCertificateList';
import ViewSubAdmins from './pages/AdminPortal/ViewSubAdmins'
import OwnershipTransfer from './pages/OwnerTransfer';
import CNIC_Upload from './pages/CNIC_Upload';
import AdminSidebar from './pages/AdminPortal/AdminSidebar.jsx';
function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path="/user-login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/loginOptions" element={<OptionPage/>}/>
            <Route path="/submission" element={<SubmissionPage/>}/>
            <Route path="/cnic" element={<CNIC_Upload/>}/>
            <Route path="/billing" element={<BillingPage/>}/>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/admin-login" element={<AdminLogin/>}/>
            <Route path="/subadmin-login" element={<SubAdminLogin/>}/>
            <Route path="/reset" element={<Reset/>}/>
            <Route path="/controller" element={<Controller/>}/>
            <Route path="/subadmin-signup" element={<SubAdminSignup/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/subAdmin" element={<ApplicationForms />} />
            <Route path="/admin" element={<ManageSubAdmin />} />
            <Route path="/tracking" element={<TrackFormStatus />} />
            <Route path="/procedure" element={<Procedure />} />
            <Route path="/userCertificates" element={<UserCertificateList />} />
            <Route path="/viewSubAdmins" element={<ViewSubAdmins />} />
            <Route path="/ownershipTransfer" element={<OwnershipTransfer />} />
            <Route path='/adminSidebar' element={<AdminSidebar/>}/>
            {/* <Route path='./statistic' element={<Statistic/>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
