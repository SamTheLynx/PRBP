import React from 'react';
import { Typography, Table } from 'antd';

const { Title } = Typography;

const DocumentsRequired = () => {
  const columns = [
    {
      title: 'Process',
      dataIndex: 'process',
      key: 'process',
    },
    {
      title: 'Documents Required',
      dataIndex: 'documentsRequired',
      key: 'documentsRequired',
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'frequency',
    },
  ];

  const data = [
    {
      key: '1',
      process: 'Registration',
      documentsRequired: (
        <ul>
          <li>Prescribed Application form duly filled in (Download Prescribed Application Form)</li>
          <li>Building Map</li>
          <li>Rules of Establishment</li>
          <li>Medical Fitness Certificate of Staff</li>
          <li>Qualification and Experience Certificates of GM, Manager, and other Staff</li>
        </ul>
      ),
      fee: 'PKR 1,600 - PKR 20,000 depending on air-conditioning status and seating capacity and city',
      frequency: 'One-time',
    },
  ];

  return (
    <div className="p-8">
      <Title level={3}>Summary of Processes, Requirements, Fees, and Schedules for Restaurant Registration</Title>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default DocumentsRequired;
