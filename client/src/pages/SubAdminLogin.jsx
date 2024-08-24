import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message } from 'antd';
import axios from 'axios';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginSubadmins } from '../store/slices/SubAdminSlice';

const { Title, Text } = Typography;

function SubAdminLogin() {
    const navigate = useNavigate();

    const dispatch=useDispatch();
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const response = await axios.post('http://localhost:5000/subadminLogin', values);
            console.log("reponse: ",response);
            if(response.data.message === 'login successful'){
                console.log("hi");
                let SubadminBody={
                    fname:response.data.subadmin?.fname,
                    cnic:response.data.subadmin?.cnic,
                    email:response.data.subadmin?.email,
                    organisation:response.data.subadmin?.organisation
                };
                localStorage.setItem('subadmin',JSON.stringify(SubadminBody));
                dispatch(loginSubadmins(SubadminBody));
                navigate("/subAdmin");
            }
        } catch (error) {
            alert("User cannot be signed in");
            console.error('There was an error!', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-form">
            <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <div className="title-text">
                    <Title level={1}>Sub-Admin Log in</Title>
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

export default SubAdminLogin;
