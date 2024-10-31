import React, {} from 'react';
import { Upload, Typography, Button, message, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import yourImage from '../assets/nadra.png'; // Replace with the path to your image
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const UploadIDCard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formData = new FormData();
    
    // Append CNIC Number to FormData
    formData.append('cnicNumber', values.cnic);

    // Append files to FormData
    ['cnicFront', 'cnicBack'].forEach((field) => {
      if (values[field] && values[field][0]) {
        formData.append(field, values[field][0].originFileObj);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/cnic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.message === "Form submitted successfully") {
        message.success('Files uploaded successfully');
        navigate('/submission'); 
      }
    } catch (error) {
      console.error('Error uploading files:', error.response?.data?.message || error.message);
      message.error('Failed to upload files');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl h-auto bg-gray-100 p-10 rounded-lg shadow-md">
        <div className="md:w-1/4 flex items-center justify-center mb-6 md:mb-0">
          <img src={yourImage} alt="Side Image" className="w-56 h-auto" />
        </div>

        <div className="md:w-3/4 flex flex-col justify-center px-4">
          <Title level={3} className="text-center text-custom-blue mb-6">Upload CNIC</Title>

          <Form onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item
              name="cnic"
              label={<Text className="block mb-2">CNIC Number</Text>}
              rules={[
                { required: true, message: "Please enter your CNIC number" },
                { pattern: /^\d{13}$/, message: "Enter a valid 13-digit CNIC number" }
              ]}
            >
              <Input placeholder="Enter CNIC" className="border-gray-300 rounded-lg" />
            </Form.Item>

            <Form.Item label="CNIC Front" name="cnicFront" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
              <Upload name="cnicFront" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />} className="w-full">
                  Upload CNIC Front
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item label="CNIC Back" name="cnicBack" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
              <Upload name="cnicBack" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />} className="w-full">
                  Upload CNIC Back
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" className="bg-custom-blue text-white px-20 py-2 rounded-md">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UploadIDCard;
