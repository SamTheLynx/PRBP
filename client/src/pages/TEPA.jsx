import React from 'react';
import { Form, Input, Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const TEPA= () => {
  const handleUpload = (info) => {
    console.log(info.file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-gray-100 p-10 rounded-lg shadow-md">
      <h1 className="text-center text-custom-blue text-3xl mb-6">Checklist for execution of parking Agreement</h1>

        <Form layout="vertical">
          {/* 1. Application addressed to Chief Engineer */}
          <Form.Item label="1. Application addressed to Chief Engineer">
            <Upload name="application" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Application</Button>
            </Upload>
          </Form.Item>

          {/* 2. Copy of Ownership Documents */}
          <Form.Item label="2. Copy of Ownership Documents">
            <Upload name="ownershipDocuments" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Ownership Documents</Button>
            </Upload>
          </Form.Item>

          {/* 3. Copy of commercialization letter */}
          <Form.Item label="3. Copy of commercialization letter (If Applicable)">
            <Upload name="commercializationLetter" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Commercialization Letter</Button>
            </Upload>
          </Form.Item>

          {/* 4. Copy of CNIC of Owner(s) */}
          <Form.Item label="4. Copy of CNIC of Owner(s)">
            <Upload name="cnicOwner" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload CNIC</Button>
            </Upload>
          </Form.Item>

          {/* 5. Power of Attorney and CNIC of Authorized Representative */}
          <Form.Item label="5. Power of Attorney and CNIC of Authorized Representative">
            <Upload name="powerOfAttorney" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Power of Attorney and CNIC</Button>
            </Upload>
          </Form.Item>

          {/* 6. Three sets of drawings */}
          <Form.Item label="6. Three sets of drawings (Plotter Size) duly signed by the owner & signed & stamped by Architect">
            <Upload name="drawings" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Drawings</Button>
            </Upload>
          </Form.Item>

          {/* 7. Parking Agreement on Online Stamp Paper */}
          <Form.Item label="7. Parking Agreement on Online Stamp Paper (Min. Rs. 3000) with NO signature(s) and thumb impression (s) of the owner (s)">
            <Upload name="parkingAgreement" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Parking Agreement</Button>
            </Upload>
          </Form.Item>

          {/* 8. Attested Copy of CNIC of witness */}
          <Form.Item label="8. Attested Copy of CNIC of witness">
            <Upload name="cnicWitness" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload CNIC of Witness</Button>
            </Upload>
          </Form.Item>

          {/* 9. Affidavit on Rs.300 stamp paper */}
          <Form.Item label="9. Affidavit on Rs.300 stamp paper NOT signed by the owner(s) and/or authorized representative">
            <Upload name="affidavit" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload Affidavit</Button>
            </Upload>
          </Form.Item>

          {/* 10. Contact Details for Correspondence / Site Visit */}
          <Form.Item label="10. Contact Details for Correspondence / Site Visit">
            <Input placeholder="Enter Contact Details" />
          </Form.Item>

          {/* 11. Copy of E-Khidmat Slip */}
          <Form.Item label="11. Copy of E-Khidmat Slip">
            <Upload name="ekhidmatSlip" listType="picture" onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload E-Khidmat Slip</Button>
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

export default TEPA;
