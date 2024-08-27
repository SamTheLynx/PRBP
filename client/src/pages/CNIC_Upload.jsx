import React from 'react';
import { Upload, Typography, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import yourImage from '../assets/nadra.png'; // Replace with the path to your image

const { Text } = Typography;

const UploadIDCard = () => {
  const handleUpload = (info) => {
    // Handle the upload logic here
    console.log(info.file);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl h-auto bg-gray-100 p-10 rounded-lg shadow-md">
        <div className="md:w-1/4 flex items-center justify-center mb-6 md:mb-0">
          <img src={yourImage} alt="Side Image" className="w-56 h-auto" />
        </div>
        <div className="md:w-3/4 flex flex-col justify-center px-4">
          <h1 className="text-center text-custom-blue text-3xl mb-6">Upload CNIC</h1>

          <div className="text-center mb-4">
            <Text className="block mb-2">Please upload your own CNIC front picture and back picture. We will ensure your information security.</Text>
          </div>

          <div className="mb-6">
           
            <div className="text-center">
              <Upload
                name="cnicFront"
                listType="picture"
                onChange={handleUpload}
                className="w-full border-gray-300 rounded-lg"
              >
                <Button icon={<UploadOutlined />} className="w-full">
                  Upload CNIC Front
                </Button>
              </Upload>
            </div>
          </div>

          <div className="mb-6">
        
            <div className="text-center">
              <Upload
                name="cnicBack"
                listType="picture"
                onChange={handleUpload}
                className="w-full border-gray-300 rounded-lg"
              >
                <Button icon={<UploadOutlined />} className="w-full">
                Upload CNIC Back
                </Button>
              </Upload>
            </div>
          </div>

          <div className="text-center">
            <button htmlType="submit" className="bg-custom-blue text-white px-20 py-2 rounded-md">
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadIDCard;





