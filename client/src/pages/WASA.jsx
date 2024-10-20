import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const WASA = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formData = new FormData();

    // Append files to FormData
    if (values.ownershipCertificate) formData.append('ownershipCertificate', values.ownershipCertificate.file.originFileObj);
    if (values.buildingPlan) formData.append('buildingPlan', values.buildingPlan.file.originFileObj);
    if (values.locationPlan) formData.append('locationPlan', values.locationPlan.file.originFileObj);
    if (values.commercializationCertificate) formData.append('commercializationCertificate', values.commercializationCertificate.file.originFileObj);
    if (values.authorityLetter) formData.append('authorityLetter', values.authorityLetter.file.originFileObj);

    try {
      const response = await axios.post('http://localhost:5000/wasa', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.message === "Form submitted successfully") {
        navigate('/tepa');
      }
    } catch (error) {
      console.error('Error submitting form:', error.response.data.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-gray-100 p-10 rounded-lg shadow-md">
        <h1 className="text-center text-custom-blue text-3xl mb-6">
          Required Documents for the Issuance of NOC Regarding Sewerage Services Augmentation Charges of WASA Lahore
        </h1>

        <Form layout="vertical" form={form} onFinish={onFinish}>

          {/* 2. Ownership Certificate */}
          <Form.Item label="2. Ownership Certificate" name="ownershipCertificate">
            <Upload name="ownershipCertificate" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Ownership Certificate</Button>
            </Upload>
          </Form.Item>

          {/* 3. Copy of Building Plan (2-Sets) */}
          <Form.Item label="3. Copy of Building Plan (2-Sets)" name="buildingPlan">
            <Upload name="buildingPlan" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Building Plan (2-Sets)</Button>
            </Upload>
          </Form.Item>

          {/* 4. Location Plan Google Image */}
          <Form.Item label="4. Location Plan Google Image" name="locationPlan">
            <Upload name="locationPlan" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Location Plan (Google Image)</Button>
            </Upload>
          </Form.Item>

          {/* 5. Commercialization Certificate */}
          <Form.Item label="5. Commercialization Certificate" name="commercializationCertificate">
            <Upload name="commercializationCertificate" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Commercialization Certificate</Button>
            </Upload>
          </Form.Item>

          {/* 6. Authority Letter */}
          <Form.Item label="6. Authority Letter" name="authorityLetter">
            <Upload name="authorityLetter" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Authority Letter</Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="text-center">
            <Button htmlType="submit" className="bg-custom-blue text-white px-20 py-2 rounded-md">
              Enter
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default WASA;
