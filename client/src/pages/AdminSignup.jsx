import React from 'react';
import { Form, Input, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

function AdminSignup() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            // Send a POST request to the signup endpoint
            console.log('sending data to signup admin ',values)
            // const { cnic, fname, lname, email, password, phone } = req.body;

            console.log('sending data to the backend')
            const response = await axios.post('http://localhost:5000/admin-signup', values);

            if (response.status === 201) {
                message.success('Admin account created successfully!');
                navigate('/user-login');
            }
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response && error.response.status === 400) {
                message.error(error.response.data.message);
            } else {
                message.error('There was an error during signup');
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
            <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                <h1 className="text-center text-custom-blue text-3xl mb-6">Admin Signup</h1>
                <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item
                        name="fname"
                        label={<Text>First Name</Text>}
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                        <Input placeholder="Enter your first name" />
                    </Form.Item>
                    <Form.Item
                        name="lname"
                        label={<Text>Last Name</Text>}
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                        <Input placeholder="Enter your last name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={<Text>Email</Text>}
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<Text>Password</Text>}
                        rules={[{ required: true, message: 'Please enter a password' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item
                        name="cnic"
                        label={<Text>CNIC</Text>}
                        rules={[{ required: true, message: 'Please enter your CNIC' }]}
                    >
                        <Input placeholder="Enter your CNIC" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label={<Text>Phone Number</Text>}
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>
                    <Form.Item className="text-center">
                        <button htmlType="submit" className="bg-custom-blue text-white px-20 py-2 rounded-md">
                            Sign Up
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default AdminSignup;
