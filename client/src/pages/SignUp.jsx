import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, Select } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

const { Title, Text } = Typography;

export default function Signup() {
  const navigate = useNavigate();


  const onFinish = async (values) => {
    console.log("user created", values);
    try {
      const response = await axios.post('http://localhost:5000/signup', values);
      console.log("response: ", response.data.message);
      if (response.data.message === "User created successfully") {
        navigate('/user-login');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Email already registered');
      } else {
        console.log('There was an error signing up!');
      }
      console.error('There was an error signing up!', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <Form layout="vertical" onFinish={onFinish}>
          <div className="text-center mb-6">
          <h1 className="text-center text-custom-blue text-3xl mb-6">Sign up</h1>
          </div>


          <Text className="block mb-1">First Name</Text>
          <Form.Item name='firstName' rules={[
            { required: true, message: 'Please enter your first name' }
          ]}>
            <Input className='border-gray-300 rounded-lg' placeholder='Enter your first name' />
          </Form.Item>

          <Text className="block mb-1">Last Name</Text>
          <Form.Item name='lastName' rules={[
            { required: true, message: 'Please enter your last name' }
          ]}>
            <Input className='border-gray-300 rounded-lg' placeholder='Enter your last name' />
          </Form.Item>

          <Text className="block mb-1">Email</Text>
          <Form.Item name='email' rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}>
            <Input className='border-gray-300 rounded-lg' placeholder='Enter your email' />
          </Form.Item>

          <Text className="block mb-1">Password</Text>
          <Form.Item name="password" rules={[
            { required: true, message: 'Please enter your password' }
          ]}>
            <Input.Password className='border-gray-300 rounded-lg' placeholder="Enter your password" />
          </Form.Item>

          <Text className="block mb-1">Phone Number</Text>
          <Form.Item name='phoneNumber' rules={[
            { required: true, message: 'Please enter your phone number' },
            { pattern: /^03[0-9]{9}$/, message: 'Phone Number should be in valid format' }
          ]}>
            <Input className='border-gray-300 rounded-lg' placeholder='Enter your phone number' />
          </Form.Item>

          <Text className="block mb-1">CNIC</Text>
          <Form.Item name='cnic' rules={[
            { required: true, message: 'Please enter your CNIC' },
            { pattern: /^\d{13}$/, message: "Enter a valid 13-digit CNIC number" }
          ]}>
            <Input className='border-gray-300 rounded-lg' placeholder='Enter your CNIC'  />
          </Form.Item>

          <Form.Item className="text-center">
                    <button  htmlType="submit" className="bg-custom-blue text-white text-white px-20 py-2 rounded-md">
                            Enter
                     </button>
                    </Form.Item>
        </Form>
      </div>
    </div>
  );
}