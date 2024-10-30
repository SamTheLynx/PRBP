import React from 'react';
import { Form, Upload, Button, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import formI from '../assets/Form-I.jpeg';

const { Title, Text } = Typography;

const DTS = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async () => {
    const values = form.getFieldsValue();
    const formData = new FormData();

    // Append files to FormData
    [
      'formIs', 'menuCard', 'leaseAgreement', 'partnershipDeed',
      'incorporationCertificate', 'memorandum', 'FormA', 'Form29'
    ].forEach((field) => {
      if (values[field] && values[field][0]) {
        formData.append(field, values[field][0].originFileObj);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/dts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.message === "Form submitted successfully") {
        message.success("Form submitted successfully");
        navigate('/commercialization'); 
      }
    } catch (error) {
      console.error('Error submitting form:', error.response?.data?.message || error.message);
      message.error('Failed to submit form');
    }
  };

  const handleUpload = (info) => {
    console.log(info.file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-gray-100 p-10 rounded-lg shadow-md">
        <h1 className="text-center text-custom-blue text-3xl mb-6">
          Documents required for Department of Tourist Services
        </h1>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* 1. Form I Collection */}
          <Form.Item
            label={
              <>
                1. Medical Fitness Certificate of each employee on the prescribed Form-I from a Registered Medical Practitioner.
                <a href={formI} download style={{ marginLeft: 5 }}>Download Form-I</a>.
              </>
            }
            name="formIs"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload name="formIs" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Form-I Collection</Button>
            </Upload>
          </Form.Item>

          {/* 3. Menu Card */}
          <Form.Item
            label="3. Menu Card"
            name="menuCard"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload name="menuCard" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Menu Card</Button>
            </Upload>
          </Form.Item>

          {/* 4. Lease Agreement */}
          <Form.Item
            label="4. Lease Agreement / Proof of Ownership"
            name="leaseAgreement"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload name="leaseAgreement" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Lease Agreement/Proof</Button>
            </Upload>
          </Form.Item>

          {/* 5. Partnership Deed */}
          <Form.Item
            label="5. Partnership Deed"
            name="partnershipDeed"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload name="partnershipDeed" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Partnership Deed</Button>
            </Upload>
          </Form.Item>

          {/* 6. Limited Company Documents */}
          <Form.Item label="6. Limited Company Documents">
            <Form.Item
              name="incorporationCertificate"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
              noStyle
            >
              <Upload name="incorporationCertificate" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload Incorporation Certificate</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="memorandum"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
              noStyle
            >
              <Upload name="memorandum" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload Memorandum and Articles of Association</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="FormA"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
              noStyle
            >
              <Upload name="FormA" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload Form-A</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="Form29"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
              noStyle
            >
              <Upload name="Form29" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload Form-29</Button>
              </Upload>
            </Form.Item>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="bg-custom-blue text-white px-20 py-2 rounded-md">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DTS;
