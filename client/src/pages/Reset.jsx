import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message } from 'antd';
import axios from 'axios';
import './Signup.css';

const { Title } = Typography;

function Reset() {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');

  const onFinish = async (values) => {
    console.log('Form Values:', values);
    
    if (otpSent) {
      // Verify OTP and reset password
      try {
        const response = await axios.post('http://localhost:5000/verifyOTP', {
          email: values.email,
          otp: values.otp,
          password: values.password,
        });
        console.log("Response: ", response.data);
        if (response.data.message === "Password reset successful") {
          message.success('Password has been reset successfully');
          navigate('/user-login');
        } else {
          message.error(response.data.message);
        }
      } catch (e) {
        console.log('There was an error in verify!', e);
        message.error('Failed to reset password.');
      }
    } else {
      // Send OTP
      try {
        const response = await axios.post('http://localhost:5000/resetPassword', {
          email: values.email,
          password: values.password,
          repassword: values.repassword,
        });
        console.log("Response: ", response.data);
        if (response.data.message === "OTP Sent") {
          message.success('OTP has been sent to your email');
          setOtpSent(true);
          setEmail(values.email);
        } else {
          message.error(response.data.message);
        }
      } catch (e) {
        console.log('There was an error!', e);
        message.error('Failed to send OTP.');
      }
    }
  };

  const clicked = ()=>{
    alert("Password successfully updated");
    navigate("/user-login")
  }

  return (
    <div className='login-form'>
      <Title level={1}>Reset Password</Title>
      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item
          name='email'
          label='Email'
          initialValue={email}
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
          <Input className='input' placeholder='Enter your email' disabled={otpSent} />
        </Form.Item>
        {!otpSent && (
          <>
            <Form.Item
              name='password'
              label='Enter Password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
              ]}
            >
              <Input.Password placeholder='Enter your password' />
            </Form.Item>
            <Form.Item
              name='repassword'
              label='Confirm Password'
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Passwords do not match');
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Confirm your password' />
            </Form.Item>
          </>
        )}
        {otpSent && (
          <Form.Item
            name='otp'
            label='OTP'
            rules={[
              {
                required: true,
                message: 'Please enter the OTP sent to your email',
              },
            ]}
          >
            <Input className='input' placeholder='Enter OTP' />
          </Form.Item>
        )}
        <Form.Item name='submit'>
          <Button type='primary' htmlType='submit' onClick={clicked}>
            {otpSent ? 'Verify OTP and Reset Password' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Reset;
