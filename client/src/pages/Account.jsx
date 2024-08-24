import React, {useState} from 'react'
import "./Account.css"
import { Link,  useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Account(){
    const navigate = useNavigate();

    const ReduxUser=useSelector((state)=>{
        return state.user;
    })
    console.log(ReduxUser)

    const[phone, setPhone] = useState(ReduxUser.phone);
    const[email, setEmail] = useState(ReduxUser.email);

    console.log("From Redux:",ReduxUser);

    const updateAccount = async () => {
       try{
            const payload = {
                cnic: ReduxUser.cnic,
                phone: phone,
                email: email
            };
            const response = await axios.post('http://localhost:5000/updateAccount', { payload });
            console.log("reponse: ",response);
       } catch(e){
        console.log("error: ", e);
       }
    };

    const logout = async () => {
        localStorage.removeItem('user'); //user removed
        localStorage.removeItem('state');
        navigate('/');
    };

  return(
    <>
        <div className='main-container'>
            <div className='acc-container'>
                <div className='title-area'>
                <p className='title'>Account</p>
                {/*<button className='btn-normal'>Verify</button>*/}
                </div>
                
                <div className='pair'>
                    <div className='pair-box'>
                        <p className='subtitle'>First Name</p>
                        <p className='text'>{ReduxUser.fname}</p>
                    </div>
                    <div className='pair-box'>
                        <p className='subtitle'>Last Name</p>
                        <p className='text'>{ReduxUser.lname}</p>
                    </div>
                </div> 
  
                <div className='pair'>
                    <div className='pair-box'>
                        <p className='subtitle'>CNIC</p>
                        <p className='text'>{ReduxUser.cnic}</p>
                    </div>
                    <div className='pair-box2'>
                        <p className='subtitle'>Phone Number</p>
                        <input className='input' type='text' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                </div> 
                 
                
                <div className='pair'>
                    <div className='pair-box2'>
                        <p className='subtitle'>Email</p>
                        <input className='input' type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='pair-box2'>
                        <p className='subtitle'>Password</p>
                        <Link to='/reset'><button className='btn-medium'>Reset Password</button></Link>
                    </div>
                </div> 
                 
                
                <div className='pair'>
                    <Link to='/userCertificates'><button className='btn-long'>Show Certificates</button></Link>
                </div>

                <div className='pair'>
                    <button className='btn-long' onClick={logout}>Logout</button>
                </div>
                    
                <div className='pair'>
                    <button className='btn-big' onClick={updateAccount}>Save Changes</button>
                </div>
                
            </div>
        </div>
    </>
  )
}

