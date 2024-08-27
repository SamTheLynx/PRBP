import React, { useState } from "react";
import "./Tracking.css"; // Import the CSS file
import { useSelector } from "react-redux";
import { ComputationsAbi } from "../../ContractAbis/ComputationsAbi";
import { ethers } from "ethers";
import PDFSrc from "../../assets/PFA Cert Example.pdf";

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const TrackFormStatus = () => {
  const ReduxUser = useSelector((state) => state.user);

  const [formId, setFormId] = useState("");
  const [trackingResult, setTrackingResult] = useState("");
  const [isFormFound, setIsFormFound] = useState(true);
  const [currentStageIndex, setCurrentStageIndex] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [inputError, setInputError] = useState("");

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
      currentStage: "DTS",
    },
    {
      id: 2,
      name: "HB2",
      email: "hb2@example.com",
      fatherName: "f2",
      address: "456 Oak Ave",
      phoneNumber: "555-987-6543",
      dateOfBirth: "02/15/1985",
      status: "processed",
      currentStage: "Approved",
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
    "Application Submitted",
    "Police Clearance",
    "DTS Approved",
    "LDA (Town Planning) Approved",
    "LDA (TEPA) Approved",
    "LDA (EPA) Approved",
    "LDA (WASA) Approved",
    "Fully Approved!",
  ];

  const organizationIndex = [
    "Police Clearance",
    "DTS",
    "LDA (Town Planning)",
    "LDA (TEPA)",
    "LDA (EPA)",
    "LDA (WASA)",
    "Approved",
    "Approved",
  ];

  const trackFormStatus = (id) => {
    const form = forms[id - 1];

    if (form) {
      const organization = form["currentStage"] || "Unknown";
      setTrackingResult(
        `Form ID: ${id}, Status: ${form["status"]}, Current Organization: ${organization}`
      );
      setIsFormFound(true);
      const index = organizationIndex.indexOf(organization);
      if (index < 6) {
        setCurrentStageIndex(index);
      } else {
        setCurrentStageIndex(7);
      }
      setIsTracking(true); // Show tracking component
    } else {
      setTrackingResult(`Form ID: ${id} not found.`);
      setIsFormFound(false);
      setCurrentStageIndex(null);
    }
  };

  const handleInputChange = (e) => {
    setFormId(e.target.value);
    if (inputError && isFormFound) {
      setInputError("");
    }
  };

  const handleTrackButtonClick = () => {
    trackFormStatus(formId);
    if (!isFormFound) {
      setInputError("Invalid application ID");
    }
  };

  const handleBackButtonClick = () => {
    setIsTracking(false); // Go back to the input form
    setFormId(""); // Clear the input field
    setInputError("");
  };

  return (
    <div className="Tracking-container">
      {isTracking ? (
        <TrackingStatusComponent
          organizations={organizations}
          currentStageIndex={currentStageIndex}
          trackingResult={trackingResult}
          formId={formId}
          onBackButtonClick={handleBackButtonClick} // Pass back button handler
        />
      ) : (
        <FormInputComponent
          formId={formId}
          handleInputChange={handleInputChange}
          handleTrackButtonClick={handleTrackButtonClick}
          isFormFound={isFormFound}
          inputError={inputError}
        />
      )}
    </div>
  );
};

// Component for Form Input
const FormInputComponent = ({ formId, handleInputChange, handleTrackButtonClick, isFormFound, inputError}) => {
  return(
    <div className="Tracking-tracking-form">
      <h2>Track Application</h2>
      <input
        type="text"
        value={formId}
        onChange={handleInputChange}
        placeholder="Application ID"
        className="Tracking-input-field"
        style={{ width: "300px", marginRight: "20px" }}
      />
      <p>{inputError}</p>
      <button onClick={handleTrackButtonClick} className="Tracking-status-button">
        Track
      </button>
    </div>
  )
};

// Component for Tracking Status
const TrackingStatusComponent = ({
  organizations,
  currentStageIndex,
  trackingResult,
  formId,
  onBackButtonClick, // Receive back button handler
}) => {
  let statusMessage = "";
  if (trackingResult.includes("pending")) {
    statusMessage = "Your application is currently under process. Please try again later.";
  } else if (trackingResult.includes("processed") || trackingResult.includes("Approved")) {
    statusMessage = (
      <span>
        Your application has been fully processed.{" "}
        <a
          href={PDFSrc} // Replace with the URL of your PDF file
          download="Certificate.pdf" // Filename for the downloaded file
        >
          Download available.
        </a>
      </span>
    );
  }
  return (
    <div>
      <div className="Tracking-organisation-list2">
        <h2>Application #{formId}</h2>

        <p>{statusMessage}</p>

        <button onClick={onBackButtonClick} className="Tracking-back-button">
          Track Another
        </button>
        
        <div className="Progress-container">
          <div className="Progress-bar">
            {organizations.map((_, index) => (
              <div
                key={index}
                className={`Progress-segment ${
                  currentStageIndex !== null && index <= currentStageIndex
                    ? "Progress-segment-active"
                    : "Progress-segment-inactive"
                }`}
              />
            ))}
          </div>
          <div className="Organization-list">
            {organizations.map((org, index) => (
              <div
                key={index}
                className={`Organization-item ${
                  currentStageIndex !== null && index <= currentStageIndex
                    ? "Organization-item-active"
                    : "Organization-item-inactive"
                }`}
              >
                {org}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="Progress-container">
          <div className="Progress-bar">
            {organizations.map((_, index) => (
              <div key={index} className="Progress-step">
                <div
                  className={`Progress-circle ${
                    currentStageIndex !== null && index <= currentStageIndex
                      ? "Progress-circle-active"
                      : "Progress-circle-inactive"
                  }`}
                >
                </div>
              </div>
            ))}
          </div>
          <div className="Organization-list">
            {organizations.map((org, index) => (
              <div
                key={index}
                className={`Organization-item ${
                  currentStageIndex !== null && index <= currentStageIndex
                    ? "Organization-item-active"
                    : "Organization-item-inactive"
                }`}
              >
                {org}
              </div>
            ))}
          </div>
        </div> */}


      </div>
    </div>
  )
};

export default TrackFormStatus;

// const TrackFormStatus = () => {
//   const ReduxUser=useSelector((state)=>{
//     return state.user;
//   })

//   const [formId, setFormId] = useState("");
//   const [trackingResult, setTrackingResult] = useState("");
//   const [isFormFound, setIsFormFound] = useState(true);
//   const [currentStageIndex, setCurrentStageIndex] = useState(null);

//   const {ethereum} = window;
//     let contract;

//     const getContractSigner = async(provider) => {
//         if(window.ethereum){
//             //console.log("provider inside function: ", provider.listAccounts());
//             let signer = await ethereum.request({method: "eth_requestAccounts"});
//             signer = signer[0];
            
//             //console.log("acc receieved from metamask: ", signer);
//             let prov;
//             for (let index = 0; index < 20; index++) {
//                 prov = await provider.getSigner(index);
//                 //console.log("prov %d inside loop: ", index, await prov.getAddress());
//                 prov = await prov.getAddress();
//                 //console.log("signer inside loop: ", signer);
//                 if(signer.toUpperCase() === prov.toUpperCase()){
//                     //console.log("matched prov: ", prov);
//                     return await provider.getSigner(index);
//                 }
//             }
//         }
//     }

//     const trackForm = async () => {
//       const provider = new ethers.JsonRpcProvider("http://localhost:8545");
//       const signer = await getContractSigner(provider);
//       contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
//       const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };  
  
//       try{
//           const data = await contract.getForm(formId);
//           console.log("Form data received");
//           console.log("contract address: ",contract.target);
//           console.log("signers address: ", await signer.getAddress());
//       }
//       catch(e){
//           console.error("Form couldn't be retrieved: ", e);
//           alert("Form couldn't be retrieved");
//       }
      
//     }

//   const forms = [
//     {
//       id: 1,
//       name: "HB1",
//       email: "l201186@lhr.nu.edu.pk",
//       fatherName: "f1",
//       address: "123 Main St",
//       phoneNumber: "555-123-4567",
//       dateOfBirth: "01/01/1990",
//       status: "pending",
//       currentStage: "Food Department Approved",
//     },
//     {
//       id: 2,
//       name: "HB2",
//       email: "hb2@example.com",
//       fatherName: "f2",
//       address: "456 Oak Ave",
//       phoneNumber: "555-987-6543",
//       dateOfBirth: "02/15/1985",
//       status: "Processed",
//       currentStage: "Fully Approved!",
//     },
//     {
//       id: 3,
//       name: "HB3",
//       email: "hb3@example.com",
//       fatherName: "f3",
//       address: "456 Oak Ave",
//       phoneNumber: "555-987-6543",
//       dateOfBirth: "02/15/1985",
//       status: "pending",
//       currentStage: "Police Clearance",
//     },
//   ];

//   const organizations = [
//     "Application Submitted", //DMA
//     "DMA Approved", // PFA
//     "Food Department Approved", //Pol
//     "Police Clearance Approved", //approved
//     "Fully Approved!", //approved
//   ];

//   const organizationIndex = [
//     "DMA", "PFA", "Police Clearance", "Approved", "Approved"
//   ]

//   const trackFormStatus = async(id) => {
//     const provider = new ethers.JsonRpcProvider("http://localhost:8545");
//     const signer = await getContractSigner(provider);
//     contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
//     //const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };  
//     let form;
//     try{
//         form = await contract.getForm(formId);
//         console.log("Form data received");
//         console.log("contract address: ",contract.target);
//         console.log("signers address: ", await signer.getAddress());
//     }
//     catch(e){
//         console.error("Form couldn't be retrieved: ", e);
//         alert("Form couldn't be retrieved");
//     }

//     if (form) {
      
//       const organization = form[12] || "Unknown";
//       setTrackingResult(
//         `Form ID: ${id}, Status: ${form[13]}, Current Organization: ${organization}`
//       );
//       setIsFormFound(true);
//       const index = organizationIndex.indexOf(organization);
//       if(index < 3){
//         setCurrentStageIndex(index)
//       }
//       else{
//         setCurrentStageIndex(4)
//       }
//       //setCurrentStageIndex(organizations.indexOf(organization));
//     } else {
//       setTrackingResult(`Form ID: ${id} not found.`);
//       setIsFormFound(false);
//       setCurrentStageIndex(null);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormId(e.target.value);
//   };

//   const handleTrackButtonClick = () => {
//     trackFormStatus(formId);
//   };

//   return (
//     <div className="Tracking-container">
//       <div className="Tracking-organization-list">
//         {organizations.map((org, index) => (
//           <div
//             key={index}
//             className={`Tracking-organization-item ${
//               currentStageIndex !== null && index <= currentStageIndex
//                 ? "current"
//                 : "not-current"
//             }`}
//           >
//             {org}
//           </div>
//         ))}
//       </div>
//       <div className="Tracking-tracking-form">
//         <div>
//           <input
//             type="text"
//             value={formId}
//             onChange={handleInputChange}
//             placeholder="Enter form ID"
//             className="Tracking-input-field"
//             style={{ width: "300px", marginRight: "20px" }}
//           />
//           <button onClick={handleTrackButtonClick} className="Tracking-status-button">
//             Track Application Status
//           </button>
//         </div>
//         <p
//           className={`Tracking-result-text ${
//             isFormFound ? "result-text-found" : "result-text-not-found"
//           }`}
//         >
//           {trackingResult}
//         </p>
//       </div>
//     </div>
//   );
// };

//export default TrackFormStatus;
