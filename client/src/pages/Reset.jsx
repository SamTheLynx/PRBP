import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-center text-custom-blue text-3xl mb-6">Reset Password</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name='email'
            label={<Text className="block mb-1">Email</Text>}
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
            <Input className='border-gray-300 rounded-lg' placeholder='Enter your email' disabled={otpSent} />
          </Form.Item>
          {!otpSent && (
            <>
              <Form.Item
                name='password'
                label={<Text className="block mb-1">Enter Password</Text>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password',
                  },
                ]}
              >
                <Input.Password className='border-gray-300 rounded-lg' placeholder='Enter your password' />
              </Form.Item>
              <Form.Item
                name='repassword'
                label={<Text className="block mb-1">Confirm Password</Text>}
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
                <Input.Password className='border-gray-300 rounded-lg' placeholder='Confirm your password' />
              </Form.Item>
            </>
          )}
          {otpSent && (
            <Form.Item
              name='otp'
              label={<Text className="block mb-1">OTP</Text>}
              rules={[
                {
                  required: true,
                  message: 'Please enter the OTP sent to your email',
                },
              ]}
            >
              <Input className='border-gray-300 rounded-lg' placeholder='Enter OTP' />
            </Form.Item>
          )}
          <Form.Item className="text-center">
            <button htmlType='submit' className=" bg-custom-blue text-white text-white px-20 py-2 rounded-md">
              {otpSent ? 'Verify OTP and Reset Password' : 'Submit'}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Reset;
