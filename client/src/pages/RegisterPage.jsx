import { Link } from "react-router-dom";
import {useState} from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000';

export default function RegisterPage(){
    const[fname, setFname] = useState('');
    const[lname, setLname] = useState('');
    const[cnic, setCnic] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    
    
    async function registerUser(e){
        e.preventDefault();
        try{
            await axios.post('/register', {
                cnic,
                fname,
                lname,
                email,
                password,
            });
            alert('Form successfully submitted!');
        }catch(e){
            alert('Form submission failed. Please try again later.');
        }
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="CNIC without dashes e.g.3520212345678" value={cnic} onChange={e=>setCnic(e.target.value)}/>
                    <input type="text" placeholder="John" value={fname} onChange={e=>setFname(e.target.value)}/>
                    <input type="text" placeholder="Doe" value={lname} onChange={e=>setLname(e.target.value)}/>
                    <input type="email" placeholder={"your@email.com"} value={email} onChange={e=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link to={'/login'} className="underline text-black">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}