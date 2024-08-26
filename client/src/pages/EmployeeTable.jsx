import React from 'react';
import { Form, InputNumber, Typography, Row, Col } from 'antd';

const { Title } = Typography;



const EmployeeTable = () => {
    return (
      <div>
        <h2 className="font-thin">Employees</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="p-2 font-thin border-b">Category</th>
                <th className="p-2 font-thin border-b">Total No.</th>
                <th className="p-2 font-thin border-b">Professionally Trained</th>
                <th className="p-2 font-thin border-b">Not professionally trained but experienced</th>
                <th className="p-2 font-thin border-b">Apprentices</th>
                <th className="p-2 font-thin border-b">English knowing</th>
              </tr>
            </thead>
            <tbody>
              {["Manager", "Reception", "Billing", "Cooks", "Bearers", "Others"].map((category) => (
                <tr key={category}>
                  <td className="p-2 border-b">{category}</td>
                  <td className="p-2 border-b">
                    <Form.Item name={`${category.toLowerCase()}Total`}>
                      <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </td>
                  <td className="p-2 border-b">
                    <Form.Item name={`${category.toLowerCase()}Trained`}>
                      <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </td>
                  <td className="p-2 border-b">
                    <Form.Item name={`${category.toLowerCase()}Experienced`}>
                      <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </td>
                  <td className="p-2 border-b">
                    <Form.Item name={`${category.toLowerCase()}Apprentices`}>
                      <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </td>
                  <td className="p-2 border-b">
                    <Form.Item name={`${category.toLowerCase()}English`}>
                      <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
export default EmployeeTable;