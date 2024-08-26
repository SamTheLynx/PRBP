import React, { useState } from 'react';
import { Button, Form, Input, Typography, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';

const { Option } = Select;
const { Title } = Typography;

const startYear = 1900; // Starting year
const endYear = new Date().getFullYear(); // Current year
const years = [];

for (let year = startYear; year <= endYear; year++) {
  years.push(year);
}

const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const provinces = [
  'Punjab',
'Sindh',
'Khyber Pakhtunkhwa',
'Balochistan',
'Gilgit-Baltistan',
'Azad Kashmir',
'Islamabad Capital Territory',
];

const towns = [
  'Gulberg',
  'Defence (DHA)',
  'Model Town',
  'Johar Town',
  'Lahore Cantonment',
  'Ravi Road',
  'Shalimar Town',
  'Bahria Town',
  'Faisal Town',
  'Samanabad',
  'Wapda Town',
  'Qurban Lines',
  'Ittafaq Town',
  'Chungi Amar Sadhu',
  'Township'
];

const size = [
  'Less than 20',
  '20 - 50',
  '51 - 100',
  '101 - 200',
  '201 - 300',
  '301 - 500',
  'More than 500'
];

const costs = [
  'Less than $500',
  '$500 - $1,000',
  '$1,001 - $2,000',
  '$2,001 - $5,000',
  '$5,001 - $10,000',
  '$10,001 - $20,000',
  'More than $20,000'
];

function SubmissionPage() {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    setFileList([file]);
    return false; // Prevent automatic upload
  };

  const onFinish = async (values) => {
    console.log('Form values: ', values);
    console.log('File List', fileList);

    // Combine fileList and values here
    navigate('/billing', { state: values });
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="bg-gray-100 p-8 shadow-lg rounded-lg max-w-xl w-full">
        <Form onFinish={onFinish} layout="vertical">
          <div className="text-center mb-6">
          <h1 className="text-center text-custom-blue text-3xl mb-6">Fill in the details</h1>
          </div>

          <Form.Item
            label="Name of Restaurant"
            name="bname"
            rules={[
              {
                required: true,
                message: 'Please input the name of your restaurant',
              },
            ]}
          >
            <Input placeholder="Name of restaurant to be registered" className="border-gray-300 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Year of establishment"
            name="year"
            rules={[
              {
                required: true,
                message: 'Please select the year of establishment',
              },
            ]}
          >
            <Select placeholder="Year of establishment" className="border-gray-300 rounded-lg">
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Exact date of commission in respect of new restaurant commissioned on or after the 1st January, 1977"
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: 'Please select the date of commission',
              },
            ]}
          >
            <Row gutter={8}>
              <Col span={8}>
                <Select placeholder="Day" className="border-gray-300 rounded-lg">
                  {days.map((day) => (
                    <Option key={day} value={day}>
                      {day}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Select placeholder="Month" className="border-gray-300 rounded-lg">
                  {months.map((month) => (
                    <Option key={month} value={month}>
                      {month}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Select placeholder="Year" className="border-gray-300 rounded-lg">
                  {years.map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input the address',
              },
            ]}
          >
            <div className="space-y-4">
              <Input placeholder="Address of the restaurant" className="border-gray-300 rounded-lg" />

              <Form.Item
                label="Telegraphic Address"
                name="telegraphicAddress"
                rules={[
                  {
                    required: true,
                    message: 'Please input the telegraphic address',
                  },
                ]}
              >
                <Input placeholder="Telegraphic address" className="border-gray-300 rounded-lg" />
              </Form.Item>

              <Form.Item
                label="Telex Number"
                name="telexNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please input the telex number',
                  },
                ]}
              >
                <Input placeholder="Telex number" className="border-gray-300 rounded-lg" />
              </Form.Item>

              <Form.Item
                label="Telephone Number (if any)"
                name="telephoneNumber"
                rules={[
                  {
              
                    message: 'Please input the telephone number',
                  },
                ]}
              >
                <Input placeholder="Telephone number" className="border-gray-300 rounded-lg" />
              </Form.Item>
            </div>
          </Form.Item>


          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: 'Please enter your location',
              },
            ]}
          >
            <Row gutter={8}>
              <Col span={8}>
                <Select placeholder="Province" className="border-gray-300 rounded-lg">
                  {provinces.map((province) => (
                    <Option key={province} value={province}>
                      {province}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Select placeholder="Town" className="border-gray-300 rounded-lg">
                  {towns.map((town) => (
                    <Option key={town} value={town}>
                      {town}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Input placeholder="Street" className="border-gray-300 rounded-lg"></Input>
          </Form.Item>

          <Form.Item
            label="Nature of ownership (sole proprietorship, cooperative, company etc)"
            name="nature"
            rules={[
              {
                required: true,
                message: 'Please input the nature of ownership',
              },
            ]}
          >
            <Input placeholder="Nature of ownership" className="border-gray-300 rounded-lg" />
          </Form.Item>
          
          <Form.Item
            label="Name of owner with parentage"
            name="parentage"
            rules={[
              {
                required: true,
                message: 'Please input the name of owner with parentage',
              },
            ]}
          >
            <Input placeholder="Name of owner with parentage" className="border-gray-300 rounded-lg" />
          </Form.Item>
          
          <Form.Item
            label="Full address of the owner with parentage"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input the address',
              },
            ]}
          >
            <div className="space-y-4">
              <Input placeholder="Address of the restaurant" className="border-gray-300 rounded-lg" />

              <Form.Item
                label="Telephonic address of the owner"
                name="telegraphicAddress"
                rules={[
                  {
                    required: true,
                    message: 'Please input the telephonic address',
                  },
                ]}
              >
                <Input placeholder="Telegraphic address" className="border-gray-300 rounded-lg" />
              </Form.Item>

              <Form.Item
                label="Telephone Number (if any)"
                name="telexNumber"
                rules={[
                  {
                  
                    message: 'Please input the telephone number',
                  },
                ]}
              >
                <Input placeholder="Telephone number" className="border-gray-300 rounded-lg" />
              </Form.Item>
              </div>
              </Form.Item>

            <Form.Item
            label="Name of manager with parentage"
            name="parentage"
            rules={[
              {
                required: true,
                message: 'Please input the name of manager with parentage',
              },
            ]}
          >
            <Input placeholder="Name of manager with parentage" className="border-gray-300 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Address of manager with parentage"
            name="parentage"
            rules={[
              {
                required: true,
                message: 'Please input the address of manager with parentage',
              },
            ]}
          >
            <Input placeholder="Address of manager with parentage" className="border-gray-300 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Telephone number (if any) of manager with parentage"
            name="parentage"
            rules={[
              {
               
                message: 'Please input the telephone number of manager with parentage',
              },
            ]}
          >
            <Input placeholder="Telephone number of manager with parentage" className="border-gray-300 rounded-lg" />
          </Form.Item>
        

   <Form.Item
            label="Size"
            name="location"
            rules={[
              {
                required: true,
                message: 'Please enter your location',
              },
            ]}
          >
            <Row gutter={8}>
              <Col span={8}>
                <Select placeholder="Total Area (sqft)" className="border-gray-300 rounded-lg">
                  {size.map((area) => (
                    <Option key={area} value={area}>
                      {area}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Select placeholder="Area of Pantry" className="border-gray-300 rounded-lg">
                {size.map((area) => (
                    <Option key={area} value={area}>
                      {area}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
           <Row gutter={8}>
              <Col span={8}>
                <Select placeholder="Area of seating capacity of dining hall" className="border-gray-300 rounded-lg">
                {size.map((area) => (
                    <Option key={area} value={area}>
                      {area}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Select placeholder="Area of Kitchen" className="border-gray-300 rounded-lg">
                {size.map((area) => (
                    <Option key={area} value={area}>
                      {area}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
           
        </Form.Item>

        <Form.Item
            label="Cost"
            name="cost"
            rules={[
              {
                required: true,
                message: 'Please enter your location',
              },
            ]}
          >
            <Row gutter={8}>
              <Col span={8}>
                <Select placeholder="Furniture and Fixture" className="border-gray-300 rounded-lg">
                  {costs.map((cost) => (
                    <Option key={cost} value={cost}>
                      {cost}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Select placeholder="Annual Rent" className="border-gray-300 rounded-lg">
                  {costs.map((cost) => (
                    <Option key={cost} value={cost}>
                      {cost}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
           <Row gutter={8}>
              <Col span={8}>
                <Select placeholder="Equipment" className="border-gray-300 rounded-lg">
                  {costs.map((cost) => (
                    <Option key={cost} value={cost}>
                      {cost}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Select placeholder="Working Capital" className="border-gray-300 rounded-lg">
                   {costs.map((cost) => (
                    <Option key={cost} value={cost}>
                      {cost}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
           <Row gutter={8}>
              <Col span={8}>
                <Select placeholder="Total Investment" className="border-gray-300 rounded-lg">
                    {costs.map((cost) => (
                    <Option key={cost} value={cost}>
                      {cost}
                    </Option>
                  ))}
                </Select>
                </Col>
            </Row>
           
   </Form.Item>

   <Form.Item
            label="Furniture and Fixture (please give details separately for the dining hall and kitchen)"
            name="cost"
            rules={[
              {
                required: true,
                message: 'Please enter your location',
              },
            ]}
          >
            <Row gutter={8}>
              <Col span={8}>
                <Input placeholder="Reception/Bill Counter" className="border-gray-300 rounded-lg"/>
               
              </Col>
              <Col span={8}>
                <Input placeholder="Telephone" className="border-gray-300 rounded-lg"/>
              
              </Col>
            </Row>

           <Row gutter={8}>
              <Col span={8}>
                <Input placeholder="Cloak room" className="border-gray-300 rounded-lg"/>
                 
              </Col>
              <Col span={8}>
                <Input placeholder="Toilet" className="border-gray-300 rounded-lg"/>
                  
              </Col>
            </Row>

       <Row gutter={8}>
              <Col span={8}>
                <Input placeholder="Car Park" className="border-gray-300 rounded-lg"/>
              </Col>
              <Col span={8}>
                <Input placeholder="Entertainments" className="border-gray-300 rounded-lg"/>  
                 
              </Col>
            </Row>


           <Row gutter={8}>
              <Col span={8}>
                <Input placeholder="Air conditioning or cooling and heating according to local conditions and weather" className="border-gray-300 rounded-lg"/>  
              </Col>
            </Row>
           
   </Form.Item>
     

        <Form.Item
            label="Types of cuisines offered"
            name="cuisines"
            rules={[
              {
                required: true,
                message: 'Please input the types of cuisines offered',
              },
            ]}
          >
            <Input  className="border-gray-300 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Class of majority of guests (indicate whether foreign or local)"
            name="guests"
            rules={[
              {
                required: true,
                message: 'Please input the class of majority of guests',
              },
            ]}
          >
            <Input  className="border-gray-300 rounded-lg" />
          </Form.Item>
          
          <EmployeeTable />
          
          <Form.Item
            label="Rates Charged"
            name="rates"
            rules={[
              {
                required: true,
                message: 'Please input the rates charged',
              },
            ]}
          >
            <Input placeholder='Immediately before 1st Jan. 1977' className="border-gray-300 rounded-lg" />
            <Input  placeholder='Present with date from which prescribed'className="border-gray-300 rounded-lg" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-center">
            <Form.Item className="text-center">
                    <button  htmlType="submit" className="bg-custom-blue text-white text-white px-20 py-2 rounded-md">
                            Save
                     </button>
            </Form.Item>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SubmissionPage;
