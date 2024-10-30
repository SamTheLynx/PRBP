import React, { useState } from 'react';
import { Button, Form, Input, Typography, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  'Punjab'
];

const zones = [
  'Ravi',
  'Shalamar',
  'Wagha',
  'Aziz Bhatti',
  'Data Ganj Bakhsh',
  'Gulberg',
  'Samnabad',
  'Allama Iqbal',
  'Nishter',
  'Cantonement'
];

const tehsil = [
  'Lahore Cantt',
  'Raiwind',
  'Lahore City',
  'Shalimar',
  'Model Town'
]

const city = [
  'Lahore'

]

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


const cuisines = [
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "Japanese",
  "Thai",
  "French",
  "Spanish",
  "Greek",
  "Mediterranean",
  "American",
  "Korean",
  "Vietnamese",
  "Middle Eastern",
  "Turkish",
  "Caribbean",
  "Ethiopian",
  "Brazilian",
  "Lebanese",
  "Russian"
];

function SubmissionPage() {
  const navigate = useNavigate();
  //const [fileList, setFileList] = useState([]);

  // const beforeUpload = (file) => {
  //   setFileList([file]);
  //   return false; // Prevent automatic upload
  // };

  const onFinish = async (values) => {
    // console.log('Form values: ', values);
    // console.log('File List', fileList);
    try {
      const response = await axios.post('http://localhost:5000/submission', values);
      console.log("response: ", response.data.message);
      if (response.data.message === "Form submitted successfully") {
        navigate('/dts');
      }
    } catch (error) {
       console.log(error);
    }
  };
  

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="bg-gray-100 p-8 shadow-lg rounded-lg max-w-3xl w-full">
        <Form onFinish={onFinish} layout="vertical">
          <div className="text-center mb-6">
          <h1 className="text-center text-custom-blue text-3xl mb-6">Fill in the details</h1>
          </div>

          <Form.Item
            label="Name of Restaurant"
            name="RestaurantName"
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
          name="dateOfCommission"
         rules={[
               {
               validator: (_, value) => {
               if (!value || !value.day || !value.month || !value.year) {
               return Promise.reject(new Error('Please select the date of commission'));
               }
               return Promise.resolve();
             },
             },
             ]}
>
      <Row gutter={8}>
        <Col span={8}>
            <Form.Item
              name={['dateOfCommission', 'day']} // Using an array to group
              noStyle
            >
              <Select placeholder="Day" className="border-gray-300 rounded-lg">
                 {  days.map((day) => (
                 <Option key={day} value={day}>
                 {day}
                </Option>
              ))}
              </Select>
           </Form.Item>
        </Col>
      <Col span={8}>
      <Form.Item
        name={['dateOfCommission', 'month']} // Using an array to group
        noStyle
      >
        <Select placeholder="Month" className="border-gray-300 rounded-lg">
          {months.map((month) => (
            <Option key={month} value={month}>
              {month}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        name={['dateOfCommission', 'year']} // Using an array to group
        noStyle
      >
        <Select placeholder="Year" className="border-gray-300 rounded-lg">
          {years.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
         </Select>
       </Form.Item>
      </Col>
      </Row>
      </Form.Item>
      





      <Form.Item
            label="Address"
            name="RestaurantAddress"
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
                name="RestaurantTelegraphicAddress"
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
                name="RestaurantTelexNumber"
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
                name="RestaurantTelephoneNumber"
                rules={[
                  {
              
                    message: 'Please input the telephone number',
                  },
                  { pattern: /^03[0-9]{9}$/, message: 'Phone Number should be in valid format' }
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
            message: 'Please input the full location',
          },
        ]}
        >
            <Row gutter={8}>

                 <Col span={6}>
                 <Form.Item
                   name={['location', 'Province']} // Using an array to group
                   noStyle
                 >
                    <Select placeholder="Province" className="border-gray-300 rounded-lg" name="province">
                     {provinces.map((province) => (
                     <Option key={province} value={province}>
                     {province}
                     </Option>
                     ))}
                   </Select>
                   </Form.Item>
                 </Col>
                

                 <Col span={6}>
                <Form.Item
                   name={['location', 'City']} // Using an array to group
                   noStyle
                 >
                  <Select placeholder="City" className="border-gray-300 rounded-lg" name="city">
                    {city.map((city) => (
                     <Option key={city} value={city}>
                     {city}
                     </Option>
                    ))}
                 </Select>
                 </Form.Item>
                </Col>

                <Col span={6}>
                <Form.Item
                   name={['location', 'Zone']} // Using an array to group
                   noStyle
                 >
                  <Select placeholder="Zone" className="border-gray-300 rounded-lg" name="zone">
                    {zones.map((zone) => (
                     <Option key={zone} value={zone}>
                     {zone}
                     </Option>
                    ))}
                 </Select>
                 </Form.Item>
                </Col>


                <Col span={6}>
                <Form.Item
                   name={['location', 'Tehsil']} // Using an array to group
                   noStyle
                 >
                  <Select placeholder="Tehsil" className="border-gray-300 rounded-lg" name="tehsil">
                   {tehsil.map((tehsil)=>(
                    <Option key={tehsil} value={tehsil}>
                       {tehsil}
                    </Option>
                   ))

                   }
                  </Select>
                  </Form.Item>
                </Col>

            </Row>
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
            name="OwnerName"
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
            name="OwnerAddress"
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
                name="OwnerTelephonicAddress"
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
                name="OwnerTelephoneNumber"
                rules={[
                  {
                  
                    message: 'Please input the telephone number',
                  },
                  { pattern: /^03[0-9]{9}$/, message: 'Phone Number should be in valid format' }
                ]}
              >
                <Input placeholder="Telephone number" className="border-gray-300 rounded-lg" />
              </Form.Item>
              </div>
              </Form.Item>

            <Form.Item
            label="Name of manager with parentage"
            name="ManagerName"
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
            name="ManagerAddress"
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
            name="ManagerTelephoneNumber"
            rules={[
              {
               
                message: 'Please input the telephone number of manager with parentage',
              },
              { pattern: /^03[0-9]{9}$/, message: 'Phone Number should be in valid format' }
            ]}
          >
            <Input placeholder="Telephone number of manager with parentage" className="border-gray-300 rounded-lg" />
          </Form.Item>
        

          <Form.Item
  label="Size"
  name="size" // Changed to a more descriptive name
  rules={[
    {
      validator: (_, value) => {
        if (!value || !value.totalArea || !value.pantryArea || !value.diningArea || !value.kitchenArea) {
          return Promise.reject(new Error('Please enter all size fields'));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Row gutter={8}>
    <Col span={8}>
      <Form.Item name={['size', 'totalArea']} noStyle>
        <Select placeholder="Total Area (sqft)" className="border-gray-300 rounded-lg">
          {size.map((area) => (
            <Option key={area} value={area}>
              {area}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item name={['size', 'pantryArea']} noStyle>
        <Select placeholder="Area of Pantry" className="border-gray-300 rounded-lg">
          {size.map((area) => (
            <Option key={area} value={area}>
              {area}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={8}>
    <Col span={8}>
      <Form.Item name={['size', 'diningArea']} noStyle>
        <Select placeholder="Area of seating capacity of dining hall" className="border-gray-300 rounded-lg">
          {size.map((area) => (
            <Option key={area} value={area}>
              {area}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item name={['size', 'kitchenArea']} noStyle>
        <Select placeholder="Area of Kitchen" className="border-gray-300 rounded-lg">
          {size.map((area) => (
            <Option key={area} value={area}>
              {area}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  </Row>
</Form.Item>


<Form.Item
  label="Cost"
  name="cost" // Main name for the cost structure
  rules={[
    {
      validator: (_, value) => {
        // Check if the value exists and if all sub-fields are filled
        if (!value || !value.furniture || !value.rent || !value.equipment || !value.capital || !value.investment) {
          return Promise.reject(new Error('Please enter all cost fields'));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Row gutter={8}>
    <Col span={8}>
      <Form.Item name={['cost', 'furniture']} noStyle>
        <Select placeholder="Furniture and Fixture" className="border-gray-300 rounded-lg">
          {costs.map((cost) => (
            <Option key={cost} value={cost}>
              {cost}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item name={['cost', 'rent']} noStyle>
        <Select placeholder="Annual Rent" className="border-gray-300 rounded-lg">
          {costs.map((cost) => (
            <Option key={cost} value={cost}>
              {cost}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={8}>
    <Col span={8}>
      <Form.Item name={['cost', 'equipment']} noStyle>
        <Select placeholder="Equipment" className="border-gray-300 rounded-lg">
          {costs.map((cost) => (
            <Option key={cost} value={cost}>
              {cost}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item name={['cost', 'capital']} noStyle>
        <Select placeholder="Working Capital" className="border-gray-300 rounded-lg">
          {costs.map((cost) => (
            <Option key={cost} value={cost}>
              {cost}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={8}>
    <Col span={8}>
      <Form.Item name={['cost', 'investment']} noStyle>
        <Select placeholder="Total Investment" className="border-gray-300 rounded-lg">
          {costs.map((cost) => (
            <Option key={cost} value={cost}>
              {cost}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  </Row>
</Form.Item>



<Form.Item
  label="Furniture and Fixture (please give details separately for the dining hall and kitchen)"
  name="furniture" // Change the name to allow for detailed validation of individual items
  rules={[
    {
      validator: (_, value) => {
        // Validate that at least one of the fields has been filled
        if (
          !value ||
          !value.reception ||
          !value.telephone ||
          !value.cloakRoom ||
          !value.toilet ||
          !value.carPark ||
          !value.entertainment ||
          !value.airConditioning
        ) {
          return Promise.reject(new Error('Please enter details for all furniture and fixture items'));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Row gutter={8}>
    <Col span={8}>
      <Form.Item name={['furniture', 'reception']} noStyle>
        <Input placeholder="Reception/Bill Counter" className="border-gray-300 rounded-lg" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item name={['furniture', 'telephone']} noStyle>
        <Input placeholder="Telephone" className="border-gray-300 rounded-lg" />
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={8}>
    <Col span={8}>
      <Form.Item name={['furniture', 'cloakRoom']} noStyle>
        <Input placeholder="Cloak room" className="border-gray-300 rounded-lg" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item name={['furniture', 'toilet']} noStyle>
        <Input placeholder="Toilet" className="border-gray-300 rounded-lg" />
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={8}>
    <Col span={8}>
      <Form.Item name={['furniture', 'carPark']} noStyle>
        <Input placeholder="Car Park" className="border-gray-300 rounded-lg" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item name={['furniture', 'entertainment']} noStyle>
        <Input placeholder="Entertainments" className="border-gray-300 rounded-lg" />
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={8}>
    <Col span={8}>
      <Form.Item name={['furniture', 'airConditioning']} noStyle>
        <Input placeholder="Air conditioning or cooling and heating according to local conditions and weather" className="border-gray-300 rounded-lg" />
      </Form.Item>
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
            <Select placeholder="Cuisines" className="border-gray-300 rounded-lg">
          {cuisines.map((cuisine) => (
            <Option key={cuisine} value={cuisine}>
              {cuisine}
            </Option>
          ))}
         </Select>
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
  required
>
  <Form.Item
    name="firstRate" // Unique name for the first input
    rules={[{ required: true, message: 'Please input the first rate charged' }]}
    noStyle // Use noStyle to remove extra margin
  >
    <Input placeholder='Immediately before 1st Jan. 1977' className="border-gray-300 rounded-lg" />
  </Form.Item>
  <Form.Item
    name="secondRate" // Unique name for the second input
    rules={[{ required: true, message: 'Please input the second rate charged' }]}
    noStyle // Use noStyle to remove extra margin
  >
    <Input placeholder='Present with date from which prescribed' className="border-gray-300 rounded-lg" />
  </Form.Item>
</Form.Item>

                   
                   
                   
                   
         <Form.Item className="text-center">
              <button  htmlType="submit" disabled={false} className="bg-custom-blue text-white text-white px-20 py-2 rounded-md">
                  Enter
              </button>
         </Form.Item>
       
       
       
        </Form>
      </div>
    </div>
  );
}

export default SubmissionPage;
