import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

function CertificationRenewal() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const onFinish = async (values) => {
        console.log('Submitted:', values);
        try {
            const response = await axios.post('http://localhost:5000/renewCertification', values);
            console.log("response:", response);
            if (response.data.message === 'renewal successful') {
                setErrorMessage("");  // Clear any previous error message
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Display specific error message
            } else {
                console.error('There was an error!', error);
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
            <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <div className="text-center mb-6">
                        <Title level={3} className="text-custom-blue">Certification Renewal</Title>
                    </div>

                    {errorMessage && (
                        <Text type="danger" className="block mb-4 text-center">{errorMessage}</Text>
                    )}

                    <Text className="block mb-1">Certification Number</Text>
                    <Form.Item
                        name="certificationNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your certification number',
                            },
                        ]}
                    >
                        <Input className="border-gray-300 rounded-lg" placeholder="Enter certification number" />
                    </Form.Item>

                    <Form.Item className="text-center">
                        <Button htmlType="submit" className="bg-custom-blue text-white px-20 py-2 rounded-md">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default CertificationRenewal;
