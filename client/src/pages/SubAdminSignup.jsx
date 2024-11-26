import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Input, Select, Typography,message } from 'antd';
import './Signup.css';
import axios from 'axios';
const {Text } = Typography;
const { Option } = Select;

function SubAdminSignup() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log("values to send signup: ",values);
        try {
            const response = await axios.post('http://localhost:5000/subadmin-signup', values);
            if (response.status === 201) {
                message.success('Admin account created successfully!');
                console.log("signed up subadmin: ",response);
                //navigate('/admin');
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
                <h1 className="text-center text-custom-blue text-3xl mb-6">Sub-Admin Signup</h1>
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
                    <Text className='heading-2'>Organization</Text>
                    <Form.Item
                      name='organisation'
                      rules={[{ required: true, message: 'Please select your organisation' }]}
                    >
                      <Select placeholder="Select organisation">
                        <Option value={1}>Police</Option>
                        <Option value={2}>DTS</Option>
                        <Option value={3}>Town Planning</Option>
                        <Option value={4}>TEPA</Option>
                        <Option value={5}>EPA</Option>
                        <Option value={6}>WASA</Option>
                      </Select>
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

export default SubAdminSignup;
