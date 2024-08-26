import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const Contact = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log("im in try!");
      const response = await axios.post('http://localhost:5000/contactus', values);
      console.log("response: ", response);
      if (response.data.message === "response received") {
        navigate('/user-login');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Email already registered');
      } else {
        console.log('There was an error submitting the form!');
      }
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
      <h1 className="text-center text-custom-blue text-3xl mb-6">Contact Us</h1>
        <Form
          name="contactForm"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter your name!',
              },
            ]}
          >
            <Input placeholder="Enter your name" className="border-gray-300 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
                type: 'email',
              },
            ]}
          >
            <Input placeholder="Enter your email" className="border-gray-300 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[
              {
                required: true,
                message: 'Please enter your message!',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter your message" className="border-gray-300 rounded-lg" />
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
};

export default Contact;