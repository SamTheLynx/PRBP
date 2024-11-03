import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Account() {
    const navigate = useNavigate();
    const ReduxUser = useSelector((state) => state.user);
    const [phone, setPhone] = useState(ReduxUser.phone);
    const [email, setEmail] = useState(ReduxUser.email);
    const [message, setMessage] = useState("");

    const updateAccount = async () => {
        try {
            const payload = {
                cnic: ReduxUser.cnic,
                phone: phone,
                email: email
            };
            const response = await axios.post('http://localhost:5000/updateAccount', { payload });
            console.log("response: ", response);

            if (response.status === 200) {
                setMessage("Account updated successfully!");
                setTimeout(() => navigate("/"), 2000); // Delay navigation to show the message
            }
        } catch (e) {
            setMessage("Failed to update account.");
            console.log("error: ", e);
        }
    };

    const logout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('state');
        navigate('/');
    };

    return (
        <>
            <div className="flex items-start justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-6">
                <div className="bg-gray-100 p-10 shadow-lg rounded-lg max-w-3xl w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-center text-custom-blue text-3xl mb-6">Account</h1>
                        {message && <p className="text-center text-green-500 mb-4">{message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">First Name</p>
                            <p className="text-custom-blue text-3xl mb-6 text-base">{ReduxUser.fname}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">Last Name</p>
                            <p className="text-custom-blue text-3xl mb-6 text-base">{ReduxUser.lname}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">CNIC</p>
                            <p className="text-custom-blue text-3xl mb-6 text-base">{ReduxUser.cnic}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">Phone Number</p>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg text-custom-blue mb-6"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8 items-center">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">Email</p>
                            <input
                                className="w-80 p-2 border border-gray-300 rounded-lg text-custom-blue mb-6"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Link to="/reset">
                                <button className="bg-custom-blue text-white px-6 py-2 rounded-md hover:bg-blue-600 transition w-80">
                                    Reset Password
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="mb-6">
                        <Link to="/userCertificates">
                            <button className="bg-custom-blue text-white px-20 py-2 rounded-md hover:bg-blue-600 transition w-full">
                                Show Certificates
                            </button>
                        </Link>
                    </div>

                    <div className="mb-6">
                        <button
                            className="bg-custom-blue text-white px-20 py-2 rounded-md hover:bg-blue-600 transition w-full"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>

                    <div>
                        <button
                            className="bg-custom-blue text-white px-20 py-2 rounded-md hover:bg-blue-600 transition w-full"
                            onClick={updateAccount}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
