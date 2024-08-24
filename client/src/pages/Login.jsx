import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import axios from 'axios';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUsers } from '../store/slices/UserSlice';

const { Title, Text } = Typography;

function Login() {
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const response = await axios.post('http://localhost:5000/userLogin', values);
            console.log("reponse: ",response);
            if(response.data.message === 'login successful'){
                console.log("hi");
                let UserBody={
                    fname:response.data.user?.fname,
                    lname:response.data.user?.lname,
                    phone:response.data.user?.phone,
                    cnic:response.data.user?.cnic,
                    email:response.data.user?.email
                };
                localStorage.setItem('user',JSON.stringify(UserBody));
                dispatch(loginUsers(UserBody));
            }
            navigate('/')
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const ReduxUser=useSelector((state)=>{
        return state.user;
    })
    console.log("From Redux:",ReduxUser);

    return (
        <div className="login-form">
            <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <div className="title-text">
                    <Title level={1}>Log in</Title>
                </div>
                <Text className="heading-1">Email</Text>
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
                    <Input className="input" placeholder="Enter your email" />
                </Form.Item>

                <Text className="heading-2">Password</Text>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password',
                        },
                    ]}
                >
                    <Input.Password className="input" placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Link to="/reset">Forgot Password?</Link>
                </Form.Item>

                <Form.Item name="submit">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;