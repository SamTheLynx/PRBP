import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button, Form, Input, Typography, Select } from 'antd';
import './Signup.css'; // Your custom styles if needed
import axios from 'axios';
import { ComputationsAbi } from '../ContractAbis/ComputationsAbi';
import { ethers } from 'ethers';  
const { Title, Text } = Typography;
const { Option } = Select;


const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function OwnershipTransfer() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id, bname, baddr,stat,temp } = location.state || {};

  const { ethereum } = window;
    let contract;

    const getContractSigner = async(provider) => {
        if(window.ethereum){
            let signer = await ethereum.request({ method: "eth_requestAccounts" });
            signer = signer[0];
            
            for (let index = 0; index < 20; index++) {
                let prov = await provider.getSigner(index);
                prov = await prov.getAddress();
                if(signer.toUpperCase() === prov.toUpperCase()){
                    return await provider.getSigner(index);
                }
            }
        }
    }

  const onFinish = async (values) => {

    console.log("user created", values);
    const provider = new ethers.JsonRpcProvider("http://localhost:8545");
        const signer = await getContractSigner(provider);

        contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
        const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };
        console.log("values: ", values);
        try {
            //await contract.transferOwnership(id,values.cnic, values.firstName, values.lastName, values.phoneNumber, values.email, values.wallet, options)
            console.log("Form updated successfully");
            console.log("contract address: ", contract.target);
            console.log("signers address: ", await signer.getAddress());
            alert("Form updated successfully");
        } catch (e) {
            console.error("Form cannot be updated at the moment: ", e);
            alert("Form cannot be updated at the moment");
        }
  };

  return (
    <div className="border2">
      <Form layout="vertical" onFinish={onFinish}>
        <div className='title-text'>
          <Title level={1}>Transfer Ownership to</Title>
        </div>

        <Text className='heading-1'>First Name</Text>
        <Form.Item name='firstName' rules={[
          { required: true, message: 'Please enter your first name' }
        ]}>
          <Input className='input' placeholder='Enter your first name' />
        </Form.Item>

        <Text className='heading-1'>Last Name</Text>
        <Form.Item name='lastName' rules={[
          { required: true, message: 'Please enter your last name' }
        ]}>
          <Input className='input' placeholder='Enter your last name' />
        </Form.Item>

        <Text className='heading-1'>Email</Text>
        <Form.Item name='email' rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}>
          <Input className='input' placeholder='Enter your email' />
        </Form.Item>
        <Text className='heading-2'>Phone Number</Text>
        <Form.Item
          name='phoneNumber'
          rules={[
            { required: true, message: 'Please enter your phone number' },
            { 
              pattern: /^\d{4}-\d{7}$/, 
              message: 'Please enter a valid phone number in the format 0301-8412125' 
            }
          ]}
        >
          <Input className='input' placeholder='Enter your phone number' />
        </Form.Item>

        <Text className='heading-2'>CNIC</Text>
        <Form.Item name='cnic' rules={[
          { required: true, message: 'Please enter your CNIC' },
          { 
            pattern: /^\d{5}-\d{7}-\d{1}$/, 
            message: 'Please enter a valid CNIC in the format 35201-1234567-3' 
          }
        ]}>
          <Input className='input' placeholder='Enter your CNIC' />
        </Form.Item>

        <Text className='heading-1'>Wallet Address</Text>
        <Form.Item name='wallet' rules={[
          { required: true, message: 'Please enter the wallet address ' },
        ]}>
          <Input className='input' placeholder='Enter the wallet address' />
        </Form.Item>

        <Form.Item name='submit'>
          <Link to="/"><Button type='primary' htmlType='submit'>Transfer</Button></Link>
        </Form.Item>
      </Form>
    </div>
  );
}