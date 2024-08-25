import React, { useState } from "react";
import "./Tracking.css"; // Import the CSS file
import { useSelector } from "react-redux";
import { ComputationsAbi } from "../../ContractAbis/ComputationsAbi";
import { ethers } from "ethers";

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const TrackFormStatus = () => {
  const ReduxUser=useSelector((state)=>{
    return state.user;
  })

  const [formId, setFormId] = useState("");
  const [trackingResult, setTrackingResult] = useState("");
  const [isFormFound, setIsFormFound] = useState(true);
  const [currentStageIndex, setCurrentStageIndex] = useState(null);

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

    const trackForm = async () => {
      const provider = new ethers.JsonRpcProvider("http://localhost:8545");
      const signer = await getContractSigner(provider);
      contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
      const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };  
  
      try{
          const data = await contract.getForm(formId);
          console.log("Form data received");
          console.log("contract address: ",contract.target);
          console.log("signers address: ", await signer.getAddress());
      }
      catch(e){
          console.error("Form couldn't be retrieved: ", e);
          alert("Form couldn't be retrieved");
      }
      
    }

  const forms = [
    {
      id: 1,
      name: "HB1",
      email: "l201186@lhr.nu.edu.pk",
      fatherName: "f1",
      address: "123 Main St",
      phoneNumber: "555-123-4567",
      dateOfBirth: "01/01/1990",
      status: "pending",
      currentStage: "Food Department Approved",
    },
    {
      id: 2,
      name: "HB2",
      email: "hb2@example.com",
      fatherName: "f2",
      address: "456 Oak Ave",
      phoneNumber: "555-987-6543",
      dateOfBirth: "02/15/1985",
      status: "Processed",
      currentStage: "Fully Approved!",
    },
    {
      id: 3,
      name: "HB3",
      email: "hb3@example.com",
      fatherName: "f3",
      address: "456 Oak Ave",
      phoneNumber: "555-987-6543",
      dateOfBirth: "02/15/1985",
      status: "pending",
      currentStage: "Police Clearance",
    },
  ];

  const organizations = [
    "Application Submitted", //DMA
    "DTS Approved", // PFA
    "LDA (Town Planning) Approved", //Pol
    "LDA (TEPA) Approved", //approved
    "LDA (EPA) Approved", //approved
    "LDA (WASA) Approved", //approved
    "Fully Approved!", //approved
  ];

  const organizationIndex = [
    "DMA", "PFA", "Police Clearance", "Approved", "Approved"
  ]

  const trackFormStatus = async(id) => {
    const provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const signer = await getContractSigner(provider);
    contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
    //const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };  
    let form;
    try{
        form = await contract.getForm(formId);
        console.log("Form data received");
        console.log("contract address: ",contract.target);
        console.log("signers address: ", await signer.getAddress());
    }
    catch(e){
        console.error("Form couldn't be retrieved: ", e);
        alert("Form couldn't be retrieved");
    }

    if (form) {
      
      const organization = form[12] || "Unknown";
      setTrackingResult(
        `Form ID: ${id}, Status: ${form[13]}, Current Organization: ${organization}`
      );
      setIsFormFound(true);
      const index = organizationIndex.indexOf(organization);
      if(index < 3){
        setCurrentStageIndex(index)
      }
      else{
        setCurrentStageIndex(4)
      }
      //setCurrentStageIndex(organizations.indexOf(organization));
    } else {
      setTrackingResult(`Form ID: ${id} not found.`);
      setIsFormFound(false);
      setCurrentStageIndex(null);
    }
  };

  const handleInputChange = (e) => {
    setFormId(e.target.value);
  };

  const handleTrackButtonClick = () => {
    trackFormStatus(formId);
  };

  return (
    <div className="Tracking-container">
      <div className="Tracking-organization-list">
        {organizations.map((org, index) => (
          <div
            key={index}
            className={`Tracking-organization-item ${
              currentStageIndex !== null && index <= currentStageIndex
                ? "current"
                : "not-current"
            }`}
          >
            {org}
          </div>
        ))}
      </div>
      <div className="Tracking-tracking-form">
        <div>
          <input
            type="text"
            value={formId}
            onChange={handleInputChange}
            placeholder="Enter form ID"
            className="Tracking-input-field"
            style={{ width: "300px", marginRight: "20px" }}
          />
          <button onClick={handleTrackButtonClick} className="Tracking-status-button">
            Track Application Status
          </button>
        </div>
        <p
          className={`Tracking-result-text ${
            isFormFound ? "result-text-found" : "result-text-not-found"
          }`}
        >
          {trackingResult}
        </p>
      </div>
    </div>
  );
};

export default TrackFormStatus;
