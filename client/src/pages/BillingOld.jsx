import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { ComputationsAbi } from '../ContractAbis/ComputationsAbi';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function BillingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const ReduxUser = useSelector((state) => state.user);
    console.log("From Redux: ", ReduxUser);

    const [walletAddr, setWalletAddr] = useState('');
    const [formId, setFormId] = useState('');

    // Form details
    const [cnic, setCnic] = useState(ReduxUser.cnic);
    const [fname, setFname] = useState(ReduxUser.fname);
    const [lname, setLname] = useState(ReduxUser.lname);
    const [phone, setPhone] = useState(ReduxUser.phone);
    const [email, setEmail] = useState(ReduxUser.email);

    // IPFS Hash storage
    const [ipfsHash, setIpfsHash] = useState(null);

    // Receive params from form submission page
    const { bname, baddr, city, province, document } = location.state || {};
    const { ethereum } = window;
    let contract;

    const getContractSigner = async (provider) => {
        if (window.ethereum) {
            let signer = await ethereum.request({ method: "eth_requestAccounts" });
            signer = signer[0];
            
            for (let index = 0; index < 20; index++) {
                let prov = await provider.getSigner(index);
                prov = await prov.getAddress();
                if (signer.toUpperCase() === prov.toUpperCase()) {
                    return await provider.getSigner(index);
                }
            }
        }
    }

    const addForm = async (formData) => {
        const provider = new ethers.JsonRpcProvider("http://localhost:8545");
        const signer = await getContractSigner(provider);

        contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
        const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };

        try {
            await contract.addForm(
                formData.get('cnic'),
                formData.get('fname'),
                formData.get('lname'),
                formData.get('phone'),
                formData.get('email'),
                formData.get('bname'),
                formData.get('baddr'),
                formData.get('city'),
                formData.get('province'),
                formData.get('ipfsHash'),
                options
            );
            alert("Form added successfully");
        } catch (e) {
            console.error("Form cannot be added at the moment: ", e);
            alert("Form cannot be added at the moment");
        }
    }

    const submitForm = async () => {
        const formData = new FormData();
        formData.append('cnic', cnic);
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('bname', bname);
        formData.append('baddr', baddr);
        formData.append('city', city);
        formData.append('province', province);
        formData.append('filename', document[0].name);
        formData.append('file', document[0].originFileObj);

        try {
            const response = await axios.post('http://localhost:5000/uploadToIpfs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setIpfsHash(response.data.IpfsHash);
            formData.append('ipfsHash', response.data.IpfsHash);
            addForm(formData);
            alert("File uploaded successfully");
            navigate("/");
        } catch (error) {
            console.error('Error uploading file:', error);
            alert("Failed to upload file.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-custom-blue mb-6 text-center">Itemized Bill</h1>
                
                <div className="mb-2 text-lg flex justify-between border-b border-gray-300 py-2">
                    <span>Platform fee:</span> <span>500 PKR</span>
                </div>
                <div className="mb-2 text-lg flex justify-between border-b border-gray-300 py-2">
                    <span>Police Khidmat Markaz:</span> <span>1,000 PKR</span>
                </div>
                <div className="mb-2 text-lg flex justify-between border-b border-gray-300 py-2">
                    <span>DTS:</span> <span>40,000 PKR</span>
                </div>
                <div className="mb-2 text-lg flex justify-between border-b border-gray-300 py-2">
                    <span>LDA:</span> <span>10,000 PKR</span>
                </div>
                <div className="mb-2 text-lg flex justify-between border-b border-gray-300 py-2">
                    <span>LDA (Town Planning):</span> <span>10,000 PKR</span>
                </div>
                <div className="mb-2 text-lg flex justify-between border-b border-gray-300 py-2">
                    <span>LDA (TEPA):</span> <span>100,000 PKR</span>
                </div>
                <div className="mb-2 text-lg flex justify-between border-b border-gray-300 py-2">
                    <span>LDA (EPA):</span> <span>150,000 PKR</span>
                </div>
                <div className="mb-2 text-lg flex justify-between border-b border-gray-300 py-2">
                    <span>LDA (WASA):</span> <span>75,000 PKR</span>
                </div>
                <div className="text-xl font-semibold text-custom-blue mt-6 flex justify-between border-t border-gray-300 pt-4">
                    <span>Your total bill is:</span> <span>368,500 PKR</span>
                </div>
                
                <button 
                    onClick={submitForm} 
                    className="mt-6 w-full bg-custom-blue text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
