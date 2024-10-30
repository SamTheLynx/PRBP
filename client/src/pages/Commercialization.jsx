import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Upload, Button, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Commercialization = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async () => {
    const values = form.getFieldsValue();
    const formData = new FormData();

    // Check if the user has uploaded a commercialization certificate
    const hasCertificate = values.commercializationCertificate && values.commercializationCertificate.length > 0;

    if (hasCertificate) {
      // Append the file to FormData
      formData.append('commercializationCertificate', values.commercializationCertificate[0].originFileObj);

      try {
        const response = await axios.post('http://localhost:5000/commercialization', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.message === "Form submitted successfully") {
          navigate('/tracking'); // Navigate to /tracking if certificate is uploaded
        }
      } catch (error) {
        console.error('Error submitting form:', error.response?.data?.message || error.message);
        message.error('Failed to submit form');
      }
    } else {
      // Navigate to /wasa if no certificate is uploaded
      navigate('/wasa');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-gray-100 p-10 rounded-lg shadow-md">
        <h1 className="text-center text-custom-blue text-3xl mb-6">
          Commercialization Certificate
        </h1>

        <Form layout="vertical" form={form} onFinish={onFinish}>

          {/* Upload Field for Commercialization Certificate */}
          <Form.Item
            label="Upload Commercialization Certificate (if you have one)"
            name="commercializationCertificate"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload name="commercializationCertificate" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Commercialization Certificate</Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="bg-custom-blue text-white px-20 py-2 rounded-md">
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Commercialization;
