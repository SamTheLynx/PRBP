import React from 'react';
import { Form, Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const WASA = () => {
  const handleUpload = (info) => {
    console.log(info.file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-gray-100 p-10 rounded-lg shadow-md">
        <h1 className="text-center text-custom-blue text-3xl mb-6">
          Required Documents for the Issuance of NOC Regarding Sewerage Services Augmentation Charges of WASA Lahore
        </h1>

        <Form layout="vertical">
          {/* 1. Copy of CNIC of respective consumer */}
          <Form.Item label="1. Copy of CNIC of respective consumer">
            <Upload name="cnicConsumer" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload CNIC</Button>
            </Upload>
          </Form.Item>

          {/* 2. Ownership Certificate */}
          <Form.Item label="2. Ownership Certificate">
            <Upload name="ownershipCertificate" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Ownership Certificate</Button>
            </Upload>
          </Form.Item>

          {/* 3. Copy of Building Plan (2-Sets) */}
          <Form.Item label="3. Copy of Building Plan (2-Sets)">
            <Upload name="buildingPlan" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Building Plan (2-Sets)</Button>
            </Upload>
          </Form.Item>

          {/* 4. Location Plan Google Image */}
          <Form.Item label="4. Location Plan Google Image">
            <Upload name="locationPlan" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Location Plan (Google Image)</Button>
            </Upload>
          </Form.Item>

          {/* 5. Commercialization Certificate */}
          <Form.Item label="5. Commercialization Certificate">
            <Upload name="commercializationCertificate" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Commercialization Certificate</Button>
            </Upload>
          </Form.Item>

          {/* 6. Authority Letter */}
          <Form.Item label="6. Authority Letter">
            <Upload name="authorityLetter" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Authority Letter</Button>
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

export default WASA;
