import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { ComputationsAbi } from '../ContractAbis/ComputationsAbi';
import styles from './BillingPage.module.css'; // Import the CSS module

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function BillingPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const ReduxUser = useSelector((state) => state.user);
    console.log("From Redux: ", ReduxUser);

    const [walletAddr, setWalletAddr] = useState('');
    const [formId, setFormId] = useState('');

    // All form details
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
            console.log("Form added successfully");
            console.log("contract address: ", contract.target);
            console.log("signers address: ", await signer.getAddress());
            alert("Form added successfully");
        } catch (e) {
            console.error("Form cannot be added at the moment: ", e);
            alert("Form cannot be added at the moment");
        }
    }

    const submitForm = async () => {
        console.log({ cnic, bname, document });

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

        console.log("Form data in billing before sending: ", formData);

        try {
            const response = await axios.post('http://localhost:5000/uploadToIpfs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setIpfsHash(response.data.IpfsHash);
            formData.append('ipfsHash', response.data.IpfsHash);
            console.log("Form data after hash input: ", formData);

            // Blockchain storage
            addForm(formData);

            console.log('File uploaded successfully!');
            alert("File uploaded successfully");
            navigate("/");
        } catch (error) {
            console.error('Error uploading file:', error);
            console.log('Failed to upload file.');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h1 className={styles.heading}>Itemized Bill</h1>
                <div className={styles.billItem}>Platform fee: <span>500 pkr</span></div>
                <div className={styles.billItem}>Police Khidmat Markaz: <span>1,000 pkr</span></div>
                <div className={styles.billItem}>DTS: <span>40,000 pkr</span></div>
                <div className={styles.billItem}>LDA: <span>10,000 pkr</span></div>
                <div className={styles.billItem}>LDA (Town Planning): <span>10,000 pkr</span></div>
                <div className={styles.billItem}>LDA (TEPA): <span>100,000 pkr</span></div>
                <div className={styles.billItem}>LDA (EPA): <span>150,000 pkr</span></div>
                <div className={styles.billItem}>LDA (WASA): <span>75,000 pkr</span></div>
                <div className={styles.totalBill}>Your total bill is: <span>368,500 pkr</span></div>
                <button className={styles.primaryButton} onClick={submitForm}>Submit</button>
            </div>
        </div>
    )
}
