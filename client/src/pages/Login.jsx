import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUsers } from '../store/slices/UserSlice';

const { Title, Text } = Typography;

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        //hardcodedSubadminLogin();
        //hardcodedUserLogin();
        try {
            const response = await axios.post('http://localhost:5000/userLogin', values);
            console.log('response: ',response)
            if (response.data.message === 'login successful') {
                let UserBody = {
                    fname: response.data.fname,
                    lname: response.data.lname,
                    phone: response.data.phone,
                    cnic: response.data.cnic,
                    email: response.data.email,
                    designation: response.data.designation,
                    organisation: response.data.organisation
                };
                console.log('userbody: ',UserBody)
                localStorage.setItem('user', JSON.stringify(UserBody));
                dispatch(loginUsers(UserBody));
                console.log('UserBody.designation: ',UserBody.designation)
                if (UserBody.designation === 'admin') {
                    navigate('/admin');
                  } else if (UserBody.designation === 'subadmin') {
                    navigate('/subadmin');
                  } else  {
                    navigate('/');
                  }             }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const ReduxUser = useSelector((state) => {
        return state.user;
    });
    console.log("From Redux:", ReduxUser);

    const hardcodedSubadminLogin = async() => {
        const userBody = {
            fname: "sub", 
            lname: "1",
            phone: "03432123432",
            cnic: "3520284993746",
            designation: "subadmin",
            email: "sub1@gmail.com",
            organisation: 1,
        }
        localStorage.setItem('user', JSON.stringify(userBody));
        console.log('userBody being dispatched:', userBody);
        dispatch(loginUsers(userBody));
        navigate('/subadmin');
    }

    const hardcodedUserLogin = async() => {
        const userBody = {
            fname: "u", 
            lname: "1",
            phone: "03454323321",
            cnic: "3540412847366",
            designation: "businessOwner",
            email: "u1@gmail.com",
        }
        localStorage.setItem('user', JSON.stringify(userBody));
        console.log('userBody being dispatched:', userBody);
        dispatch(loginUsers(userBody));
        navigate('/');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
            <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <div className="text-center mb-6">
                    <h1 className="text-center text-custom-blue text-3xl mb-6">Login</h1>
                    </div>
                    <Text className="block mb-1">Email</Text>
                    <Form.Item
                        name="email"
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

                    <Text className="block mb-1">Password</Text>
                    <Form.Item
                        name="password"
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
                            Enter
                     </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;