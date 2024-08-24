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
      if (response.message === "response received") {
        
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
    <div className='login-form'>
      <Title level={2}>Contact Us</Title>
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
          <Input placeholder="Enter your name" />
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
          <Input placeholder="Enter your email" />
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
          <Input.TextArea rows={4} placeholder="Enter your message" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Contact;
