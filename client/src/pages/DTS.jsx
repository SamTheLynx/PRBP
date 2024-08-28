import React from 'react';
import { Form, Input, Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import formI from '../assets/Form-I.jpeg'

const { Title, Text } = Typography;

const DTS= () => {
  const handleUpload = (info) => {
    console.log(info.file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-gray-100 p-10 rounded-lg shadow-md">
      <h1 className="text-center text-custom-blue text-3xl mb-6">Documents required for Department of Tourist Services</h1>

        <Form layout="vertical">
          {/* 1. Form I Collection */}
          <Form.Item label={ <>
                1. Medical Fitness Certificate of each employee on the prescribed Form-I from a Registered Medical Practitioner. 
                <a href={formI} download style={{ marginLeft: 5 }}>Download Form-I</a>.
            </>}>
            <Upload name="formIs" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Form-I Collection</Button>
            </Upload>
          </Form.Item>

          {/* 2. Building Plan of Restaurant. */}
          <Form.Item label="2. Building Plan of Restaurant.">
            <Upload name="buidingPlan" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Building Plan</Button>
            </Upload>
          </Form.Item>

          {/* 3. menu card */}
          <Form.Item label="3. Menu Card">
            <Upload name="menuCard" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Menu Card</Button>
            </Upload>
          </Form.Item>

          {/* 4. Attested copies of Lease Agreement / Proof of Ownership of Hotel/Restaurant premises. */}
          <Form.Item label="4. Attested copies of Lease Agreement / Proof of Ownership of Hotel/Restaurant premises.">
            <Upload name="leaseAgreement" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Lease Agreement/Proof</Button>
            </Upload>
          </Form.Item>

          {/* 5. In case of a Partnership Firm, attested copies of Registration Certificate and Partnership Deed duly certified by the Registrar of Firms. */}
          <Form.Item label="5. In case of a Partnership Firm, attested copies of Registration Certificate and Partnership Deed duly certified by the Registrar of Firms.">
            <Upload name="partnershipDeed" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Partnership Deed</Button>
            </Upload>
          </Form.Item>

          {/* 6. In case of a Limited Company, attested copies of Incorporation Certificate, Memorandum and Articles of Association, Form-A and Form–29 duly certified by the Registrar of Companies. */}
          <Form.Item label="6. In case of a Limited Company, attested copies of Incorporation Certificate, Memorandum and Articles of Association, Form-A and Form–29 duly certified by the Registrar of Companies.">
            <Upload name="incorporationCertificate" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Incorporation Certificate</Button>
            </Upload>
            <Upload name="memorandum" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Memorandum and Articles of Association</Button>
            </Upload>
            <Upload name="FormA" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Form-A</Button>
            </Upload>
            <Upload name="Form29" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Form-29</Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="text-center">
                    <button  htmlType="submit" className="bg-custom-blue text-white text-white px-20 py-2 rounded-md">
                            Enter
                     </button>
          </Form.Item>
          
        </Form>
      </div>
    </div>
  );
};

export default DTS;
