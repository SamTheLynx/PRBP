import React, { useState } from 'react';
import styles from './SubmissionPage.module.css'
import { Button, Form, Input, Typography, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {ethers} from 'ethers';

const { Option } = Select;
const { Title } = Typography;
const provinces = [
    'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Gilgit-Baltistan',
  'Azad Kashmir',
  'Islamabad Capital Territory',
  ];

  const cities = [
    'Lahore',
    'Faisalabad',
    'Rawalpindi',
    'Multan',
    'Gujranwala',
    'Bahawalpur',
    'Karachi',
    'Hyderabad',
    'Sukkur',
    'Larkana',
    'Nawabshah',
    'Mirpur Khas',
    'Peshawar',
    'Abbottabad',
    'Mardan',
    'Swat',
    'Haripur',
    'Nowshera',
    'Quetta',
    'Gwadar',
    'Khuzdar',
    'Turbat',
    'Chaman',
    'Zhob',
    'Islamabad',
    'Gilgit',
    'Skardu',
    'Chilas',
    'Ghizer',
    'Hunza',
    'Astore',
    'Muzaffarabad',
    'Mirpur',
    'Kotli',
    'Rawalakot',
    'Bagh',
    'Sudhanoti',
  ];
cities.sort((a, b) => a.localeCompare(b));



function SubmissionPage() {

  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    setFileList([file]);
    return false; // Prevent automatic upload
  };

  const onFinish = async (values) => {
    console.log('Form values: ', values);
    console.log('File List',fileList);

    // combine fileList and values here
    navigate('/billing', { state:  values  });
  };

  return (
    <div className={styles.border2}> 
      <Form labelCol={{
      span: 8,
    }}
    wrapperCol={{
        span: 8,
      }} onFinish={onFinish}>
        <div className={styles.title}>
          <Title level={3}>Please fill in all the details of the business you want to register</Title>
        </div>
      <div className={styles.sub}>
      
    <Form.Item
      label="Business Name" 
      name="bname"
      rules={[
        {
          required: true,
          message: 'Please input your Business Name',
        },
      ]}
    >
      <Input placeholder='Business Name' />
    </Form.Item>
    <Form.Item
      label="Business Address" 
      name="baddr"
      rules={[
        {
          required: true,
          message: 'Please input address of business location',
        },
      ]}
    >
      <Input placeholder='Business Owner' />
    </Form.Item>
   
    <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: 'Please select your City',
            },
          ]}
        >
          <Select placeholder="Select city">
            {cities.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
    </Form.Item>
    <Form.Item
          label="Province"
          name="province"
          rules={[
            {
              required: true,
              message: 'Please select your province',
            },
          ]}
        >
          <Select placeholder="Select province">
            {provinces.map((province) => (
              <Option key={province} value={province}>
                {province}
              </Option>
            ))}
          </Select>
    </Form.Item>

    <Form.Item
        label="Upload a .pdf document"
        name="document"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
        rules={[
          {
            required: true,
            message: 'Please upload your document',
          },
        ]}
      >
        <Upload
          name="document"
          listType="text"
          multiple={false}
          beforeUpload={beforeUpload}
          fileList={fileList}
          onRemove={() => setFileList([])}
        >
          <Button className={styles.submitbtn2} icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
    </Form.Item>
    
    <div className={styles.submit}>
    <Form.Item >
      <Button type="primary" htmlType="submit" className={styles.submitbtn}>
        Submit
      </Button>
    </Form.Item>
    </div>
    </div>
      </Form>
    </div>
  );
}
  
export default SubmissionPage;
