import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Form, Upload, Input, Button, message } from 'antd';
import { UploadOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

const WASA = () => {
  const [form] = Form.useForm();
  const [isUpperFieldsComplete, setIsUpperFieldsComplete] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //retrieve formId from previous page
  useEffect(() => {
    if (location.state?.formId) {
      console.log("Form ID received in WASA: ", location.state.formId);
      // You can now use the formId for any necessary operations
    }
  }, [location.state]);

  const requiredFields = [
    'ownershipCertificate', 'buildingPlan', 
    'locationPlan', 'authorityLetter'
  ];

  const checkUpperFieldsCompletion = (changedValues, allValues) => {
    const areAllRequiredFieldsComplete = requiredFields.every(
      (field) => allValues[field] && allValues[field].length > 0
    );
    setIsUpperFieldsComplete(areAllRequiredFieldsComplete);
  };

  const toggleAdditionalFields = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };

  const onFinish = async () => {
    let values = form.getFieldsValue();
    const formData = new FormData();
    values = {formGId: location.state.formId, ...values}; //add the id of form-G as reference for fetching documents
    
    // Append files to FormData
    formData.append('formGId', values.formGId);
    [
      'ownershipCertificate', 'buildingPlan', 
      'locationPlan', 'authorityLetter', 'application', 
      'drawings', 'parkingAgreement', 
      'affidavit', 'ekhidmatSlip'
    ].forEach((field) => {
      if (values[field] && values[field][0]) {
        formData.append(field, values[field][0].originFileObj);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/wasa', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.message === "Form submitted successfully") {
        navigate('/billing');
      }
    } catch (error) {
      console.error('Error submitting form:', error.response?.data?.message || error.message);
      message.error('Failed to submit form');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-gray-100 p-10 rounded-lg shadow-md">
        <h1 className="text-center text-custom-blue text-3xl mb-6">
          Required Documents for the Issuance of NOC Regarding Sewerage Services Augmentation Charges of WASA Lahore
        </h1>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onValuesChange={checkUpperFieldsCompletion}
        >
          {/* Upper Fields */}
          <Form.Item label="Ownership Certificate" name="ownershipCertificate" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
            <Upload name="ownershipCertificate" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Ownership Certificate</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Building Plan (2-Sets)" name="buildingPlan" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
            <Upload name="buildingPlan" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Building Plan</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Location Plan (Google Image)" name="locationPlan" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
            <Upload name="locationPlan" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Location Plan</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Authority Letter" name="authorityLetter" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
            <Upload name="authorityLetter" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Authority Letter</Button>
            </Upload>
          </Form.Item>

          {/* Toggle Arrow Icon */}
          <div className="text-center my-4 cursor-pointer" onClick={toggleAdditionalFields}>
            {showAdditionalFields ? (
              <UpOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            ) : (
              <DownOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            )}
          </div>

          {/* Conditional Fields */}
          {showAdditionalFields && (
            <>
              <h1 className="text-center text-custom-blue text-3xl mb-6">Checklist for execution of parking Agreement</h1>

              <Form.Item label="Application to Chief Engineer" name="application" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                <Upload name="application" listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Application</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Drawings (3 sets, Plotter Size)" name="drawings" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                <Upload name="drawings" listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Drawings</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Parking Agreement on Online Stamp Paper" name="parkingAgreement" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                <Upload name="parkingAgreement" listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Parking Agreement</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Affidavit on Rs.300 Stamp Paper" name="affidavit" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                <Upload name="affidavit" listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Affidavit</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Contact Details for Correspondence / Site Visit" name="contactDetails">
                <Input placeholder="Enter Contact Details" />
              </Form.Item>

              <Form.Item label="Copy of E-Khidmat Slip" name="ekhidmatSlip" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                <Upload name="ekhidmatSlip" listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload E-Khidmat Slip</Button>
                </Upload>
              </Form.Item>
            </>
          )}

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

export default WASA;
