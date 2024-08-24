import React, {useState, useEffect} from 'react'
import "./UserCertificateList.css"
import CertificateItem from './CertificateItem';
import { ethers } from 'ethers';
import {ComputationsAbi} from '../ContractAbis/ComputationsAbi';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function UserCertificateList(){

    
    const [certs, setCerts] = useState([
        {
            id:'090718',
            name:'Applebees',
            dos:'09-12-2017',
            progress:'Completed',
            hide:false
        },
        {
            id:'090866',
            name:'Subway',
            dos:'13-09-2023',
            progress:'Pending',
            hide:false
        }
    ])

    const[forms, setForms] = useState([]);

    const {ethereum} = window;
    let contract;

    const getContractSigner = async(provider) => {
        if(window.ethereum){
            //console.log("provider inside function: ", provider.listAccounts());
            let signer = await ethereum.request({method: "eth_requestAccounts"});
            signer = signer[0];
            
            //console.log("acc receieved from metamask: ", signer);
            let prov;
            for (let index = 0; index < 20; index++) {
                prov = await provider.getSigner(index);
                //console.log("prov %d inside loop: ", index, await prov.getAddress());
                prov = await prov.getAddress();
                //console.log("signer inside loop: ", signer);
                if(signer.toUpperCase() === prov.toUpperCase()){
                    //console.log("matched prov: ", prov);
                    return await provider.getSigner(index);
                }
            }
        }
    }

    const cancelForm = async (id) => {
        const provider = new ethers.JsonRpcProvider("http://localhost:8545");
        const signer = await getContractSigner(provider);
        contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
        const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };

        try{
            await contract.cancelForm(id, options); // Wait for the transaction to be mined
            console.log("Form cancelled successfully");
            console.log("contract address: ",contract.target);
            console.log("signers address: ", await signer.getAddress());
            alert("form cancelled successfully");
        }
        catch(e){
            console.error("Form cannot be cancelled: ", e);
            alert("Form cannot be cancelled");
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (window.ethereum) {
                const provider = new ethers.JsonRpcProvider("http://localhost:8545");

                const signer = await getContractSigner(provider);
                console.log("current signer for listing: ", await signer.getAddress());
                const contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);

                const count = await contract.formCount();
                console.log("count of forms: ", count);

                const newForms = new Set();
                let data;
                for (let index = 1; index <= count; index++) {
                    data = await contract.getForm(index);
                    //filters go here
                    // if(data[3] !== "cancelled"){
                    //     newForms.add(data.toString());
                    // }
                    newForms.add({
                        id: data[0].toString(),
                        cnic: data[1],
                        fname: data[2],
                        lname: data[3],
                        phone: data[4],
                        email:data[5],
                        bname: data[6],
                        baddr: data[7],
                        city: data[8],
                        province: data[9],
                        ipfsHash: data[10],
                        walletAdrr: data[11],
                        org: data[12],
                        status: data[13],
                        hide: false
                      })
                }
                const arrayOfObjects = Array.from(newForms);
                setForms(arrayOfObjects);
            } else {
                console.error("MetaMask not detected");
            }
        }

        fetchData();
    }, []);

    const cancelBtn = async(id, hide)=>{
        cancelForm(id);
        hide = true;
    }

  return(
    <>
        <div className='main-container'>
            <div className='list-container'>
                <div className='title-container'>
                    <p>ID</p>
                    <p>Business Name</p>
                    <p>Business Address</p>
                    <p>Progress</p>
                </div>
                {/* {certs.map((cert, index) => (
                    <CertificateItem
                        key={cert.id}
                        id={cert.id}
                        name={cert.name}
                        dos={cert.dos}
                        progress={cert.progress}
                        clicked={index === 1 ? cancelBtn : undefined} // Apply `cancelBtn` only to the second item
                        hide={cert.hide}
                    />
                ))} */}
                {forms.map((form, index) => (
                    <CertificateItem
                        key={form.id}
                        id={form.id} 
                        name={form.bname}
                        dos={form.baddr} // Assuming 'dos' for the second form, corrected from 'walletAddr' if it's consistent.
                        progress={form.status}
                        clicked={form.status === 'pending' ? ()=>{cancelBtn(form.id, form.hide)} : undefined} // Apply `cancelBtn` only to the second item
                        hide={form.hide}
                    />
                    ))}

            </div>
        </div>
    </>
  )
}