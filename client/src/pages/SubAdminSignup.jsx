import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, Typography } from 'antd';
import './Signup.css';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

export default function SubAdminSignup() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("subadmin created", values);
    try {
      console.log("im in try!");
      const response = await axios.post('http://localhost:5000/subadminSignup', values);
      console.log("response: ", response.data.message);
      if (response.data.message === "User created successfully") {
        
        navigate('/admin');
      }
    } catch (error) {
      alert("User cannot be signed in");
      if (error.response && error.response.status === 400) {
        console.log('Email already registered');
      } else {
        console.log('There was an error signing up!');
      }
      console.error('There was an error signing up!', error);
    }
  };

  return (
    <div className="border2">
      <Form layout="vertical" onFinish={onFinish}>
        <div className='title-text'>
          <Title level={1}>Sub-Admin Sign Up</Title>
        </div>

        <Text className='heading-1'>First Name</Text>
        <Form.Item
          name='firstName'
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input className='input' placeholder='Enter your first name' />
        </Form.Item>

        <Text className='heading-2'>Last Name</Text>
        <Form.Item
          name='lastName'
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input className='input' placeholder='Enter your last name' />
        </Form.Item>

        <Text className='heading-2'>Email</Text>
        <Form.Item
          name='email'
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input className='input' placeholder='Enter your email' />
        </Form.Item>

        <Text className='heading-2'>Password</Text>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password className="input" placeholder="Enter your password" />
        </Form.Item>

        <Text className='heading-2'>Phone Number</Text>
        <Form.Item
          name='number'
          rules={[
            { required: true, message: 'Please enter your phone number' },
            { type: 'string', message: 'Please enter a valid phone number' },
          ]}
        >
          <Input className='input' placeholder='Enter your phone number' />
        </Form.Item>

        <Text className='heading-2'>CNIC</Text>
        <Form.Item
          name='cnic'
          rules={[
            { required: true, message: 'Please enter your CNIC' },
            { type: 'string', message: 'Please enter a valid CNIC' },
          ]}
        >
          <Input className='input' placeholder='Enter your CNIC' />
        </Form.Item>

        <Text className='heading-2'>Organization</Text>
        <Form.Item
          name='organization'
          rules={[{ required: true, message: 'Please select your organization' }]}
        >
          <Select placeholder="Select your organization">
            <Option value="DMA">DMA</Option>
            <Option value="PFA">PFA</Option>
            <Option value="Police Clearance">Police Clearance</Option>
          </Select>
        </Form.Item>

        <Form.Item name='submit'>
          <Button type='primary' htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
