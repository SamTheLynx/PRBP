import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSubadmins } from '../store/slices/SubAdminSlice';

const { Title, Text } = Typography;

function SubAdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const response = await axios.post('http://localhost:5000/subadminLogin', values);
            console.log("Response: ", response);
            if (response.data.message === 'login successful') {
                let SubadminBody = {
                    fname: response.data.subadmin?.fname,
                    cnic: response.data.subadmin?.cnic,
                    email: response.data.subadmin?.email,
                    organisation: response.data.subadmin?.organisation
                };
                localStorage.setItem('subadmin', JSON.stringify(SubadminBody));
                dispatch(loginSubadmins(SubadminBody));
                navigate("/subAdmin");
            }
        } catch (error) {
            message.error('User cannot be signed in');
            console.error('There was an error!', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
            <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                <div className="text-center mb-6">
                <h1 className="text-center text-custom-blue text-3xl mb-6">Sub-Admin Login</h1>
                </div>
                <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item
                        name="email"
                        label={<Text className="block mb-1">Email</Text>}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email',
                            },
                        ]}
                    >
                        <Input className="border-gray-300 rounded-lg" placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<Text className="block mb-1">Password</Text>}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password',
                            },
                        ]}
                    >
                        <Input.Password className="border-gray-300 rounded-lg" placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Link to="/reset" className="text-blue-600 hover:underline">Forgot Password?</Link>
                    </Form.Item>

                    <Form.Item className="text-center">
                        <button  htmlType="submit" className="bg-custom-blue text-white text-white px-20 py-2 rounded-md">
                            Submit
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default SubAdminLogin;
