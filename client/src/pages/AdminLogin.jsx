import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Typography, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAdmins } from '../store/slices/AdminSlice';

const { Text } = Typography;

function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            console.log('login call')

            const response = await axios.post('http://localhost:5000/api/admin/Login', values);            
            if (response.data.token) {
                const adminDetails = {
                    id: response.data._id,
                    name: `${response.data.fname} ${response.data.lname}`,
                    email: response.data.email,
                    token: response.data.token,
                };
               console.log('in response')
                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('admin', JSON.stringify(adminDetails));
                dispatch(loginAdmins(adminDetails));
                navigate("/admin");
            } else {
                message.error('Login failed: Invalid email or password');
            }
        } catch (error) {
            console.error('There was an error!', error);
            message.error('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
            <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                <h1 className="text-center text-custom-blue text-3xl mb-6">Admin Login</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        label={<Text className="block mb-1">Email</Text>}
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input className="border-gray-300 rounded-lg" placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<Text className="block mb-1">Password</Text>}
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password className="border-gray-300 rounded-lg" placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Link to="/reset" className="text-blue-600 hover:underline">Forgot Password?</Link>
                    </Form.Item>

                    <Form.Item className="text-center">
                        <button type="submit" className="bg-custom-blue text-white px-20 py-2 rounded-md">
                            Enter
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default AdminLogin;
