import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApplicationForms.css";
import { useSelector } from "react-redux";


const testForms = [
  {
    "_id": {
      "$oid": "67229dce7784f7838e5d0fa7"
    },
    "OwnerCnic": "35404-1284736-6",
    "status": 1,
    "RestaurantName": "Jaybee's",
    "year": 1900,
    "dateOfCommission": {
      "day": 1,
      "month": 1,
      "year": 1900
    },
    "RestaurantAddress": "03425364775",
    "RestaurantTelegraphicAddress": "1",
    "RestaurantTelexNumber": "03425364775",
    "location": {
      "Province": "Punjab",
      "Town": "Gulberg",
      "UC": "uc1"
    },
    "nature": "1",
    "OwnerName": "1",
    "OwnerAddress": "03425534678",
    "OwnerTelephonicAddress": "03425534678",
    "ManagerName": "1",
    "ManagerAddress": "1",
    "size": {
      "totalArea": "Less than 20",
      "pantryArea": "Less than 20",
      "diningArea": "Less than 20",
      "kitchenArea": "Less than 20"
    },
    "cost": {
      "furniture": "Less than $500",
      "rent": "Less than $500",
      "equipment": "Less than $500",
      "capital": "Less than $500",
      "investment": "Less than $500"
    },
    "furniture": {
      "reception": "1",
      "telephone": "1",
      "cloakRoom": "1",
      "toilet": "1",
      "carPark": "1",
      "entertainment": "1",
      "airConditioning": "1"
    },
    "cuisines": "Italian",
    "guests": "1",
    "firstRate": "1",
    "secondRate": "1",
    "__v": 0
  },
  {
    "_id": {
      "$oid": "6723e2393d6676d478880353"
    },
    "OwnerCnic": "35404-1284736-6",
    "status": 7,
    "RestaurantName": "Sweet Creme",
    "year": 1900,
    "dateOfCommission": {
      "day": 1,
      "month": 1,
      "year": 1900
    },
    "RestaurantAddress": "03425364775",
    "RestaurantTelegraphicAddress": "9",
    "RestaurantTelexNumber": "03425364775",
    "location": {
      "Province": "Punjab",
      "City": "Lahore",
      "Zone": "Aziz Bhatti",
      "Tehsil": "Lahore City"
    },
    "nature": "9",
    "OwnerName": "9",
    "OwnerAddress": "03425534678",
    "OwnerTelephonicAddress": "03425534678",
    "ManagerName": "9",
    "ManagerAddress": "9",
    "ManagerTelephoneNumber": "03021425345",
    "size": {
      "totalArea": "Less than 20",
      "pantryArea": "Less than 20",
      "diningArea": "Less than 20",
      "kitchenArea": "Less than 20"
    },
    "cost": {
      "furniture": "Less than $500",
      "rent": "Less than $500",
      "equipment": "Less than $500",
      "capital": "Less than $500",
      "investment": "Less than $500"
    },
    "furniture": {
      "reception": "9",
      "telephone": "9",
      "cloakRoom": "9",
      "toilet": "9",
      "carPark": "9",
      "entertainment": "9",
      "airConditioning": "9"
    },
    "cuisines": "Italian",
    "guests": "8",
    "firstRate": "9",
    "secondRate": "9",
    "__v": 0
  }
]



// FormItem component
const FormItem = ({ form, onAccept, onReject }) => {
  const [showMore, setShowMore] = useState(false);
  console.log("form id in <FormItem>: ", form.formGId);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleShowDocument = async (ipfsHash) => {
    // Toggle the state to show or hide additional content
    setShowMore(!showMore);
  
    if (!showMore) {
      console.log("hi");
      try{
        //fetch the document pdfs (cnic, dts, wasa, tepa) by formGId
        //and open them up in tabs

      } catch(e) {
        console.error('Error fetching PDF from cnicDoc:', e);
      }
    }
  };
  

  const handleReject = async (formId, email_, rejectionReason) => {
    try {
      const response = await axios.post('http://localhost:5000/send-rejection-email', {
        email: email_,
        reason: rejectionReason,
      });
      alert('Form Rejected!');
      if (response.status !== 200) {
        throw new Error('Error sending email');
      }

      // Call the original onReject function to update the form status
      onReject(formId);
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  return (
    <div className="form-item">
      <div className="flex-container">
        <p>Form ID: {form.formGId}</p>
        <p>CNIC: {form.OwnerCnic}</p>
        <p>Restaurant Name: {form.RestaurantName}</p>
        <p>Year: {form.year}</p>
      </div>
      {!showMore && (
        <button className="btn" onClick={()=>toggleShowDocument(form.ipfsHash)}>
          View Full Form
        </button>
      )}
      {showMore && (
        <>
        <div className="flex-container">
          <p>Date of Commission: {form.dateOfCommission.day}, {form.dateOfCommission.month}, {form.dateOfCommission.year}</p>
          <p>Restaurant Address: {form.RestaurantAddress}</p>
          <p>Restaurant Telegraphic Address: {form.RestaurantTelegraphicAddress}</p>
          <p>Restaurant Telex Number: {form.RestaurantTelexNumber}</p>
          <p>Location: {form.location.City}, {form.location.Zone}, {form.location.Tehsil}, {form.location.Province}</p>
          <p>Nature: {form.nature}</p>
          <p>Owner Name: {form.OwnerName}</p>
          <p>Owner Address: {form.OwnerAddress}</p>
          <p>Owner Telephonic Address: {form.OwnerTelephonicAddress}</p>
          <p>Manager Name: {form.ManagerName}</p>
          <p>Manager Address: {form.ManagerAddress}</p>
          <p>Manager Telephone Number: {form.ManagerTelephoneNumber}</p>
          <div>Total Area: {form.size.totalArea}</div>
          <div>Pantry Area: {form.size.pantryArea}</div>
          <div>Dining Area: {form.size.diningArea}</div>
          <div>Kitchen Area: {form.size.kitchenArea}</div>
          <p>Furniture Cost: {form.cost.furniture}</p>
          <p>Rent Cost: {form.cost.rent}</p>
          <p>Equipment Cost: {form.cost.equipment}</p>
          <p>Capital Cost: {form.cost.capital}</p>
          <p>Equipment Cost: {form.cost.investment}</p>
          <p>Reception Details: {form.furniture.reception}</p>
          <p>Telephone Details: {form.furniture.telephone}</p>
          <p>Cloak Room Details: {form.furniture.cloakRoom}</p>
          <p>Toilet Details: {form.furniture.toilet}</p>
          <p>Car Park Details:{form.furniture.carPark}</p>
          <p>Entertainment Details: {form.furniture.entertainment}</p>
          <p>AC Details: {form.furniture.airConditioning}</p>
          <p>Cuisine: {form.cuisines}</p>
          <p>Type of Guests: {form.guests}</p>
          <p>First Rate: {form.firstRate}</p>
          <p>Second Rate: {form.secondRate}</p>
        </div>
        <button className="btn" onClick={toggleShowMore}>
        Less
        </button>
        </>
      )}
      <div className="button-row">
        <button className="btn" onClick={() => onAccept(form.id)}>
          Accept
        </button>
        <button className="btn" onClick={() => handleReject(form.id, form.email)}>
          Reject
        </button>
      </div>
    </div>
  );
};

// FormList component
const FormList = ({ forms, onAccept, onReject, title }) => {
  return (
    <div className="form-list">
      <h2>{title}</h2>
      {forms.map((form) => (
        <FormItem
          key={form.id}
          form={form}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
};

// AcceptedForms and RejectedForms components
const AcceptedForms = ({ forms }) => {
  return (
    <div className="accepted-forms">
      <h2>Accepted Forms</h2>
      {forms.length === 0 ? (
        <p>No forms accepted yet.</p>
      ) : (
        forms.map((form) => (
          <div key={form.id} className="form-item">
            <p>Form ID: {form.id}</p>
            <p>CNIC: {form.cnic}</p>
            <p>First Name: {form.fname}</p>
            <p>Last Name: {form.lname}</p>
            <p>Phone Number: {form.phone}</p>
            <p>Email: {form.email}</p>
            <p>Business Name: {form.bname}</p>
            <p>Business Address: {form.baddr}, {form.city}, {form.province}</p>
          </div>
        ))
      )}
    </div>
  );
};

const RejectedForms = ({ forms }) => {
  return (
    <div className="rejected-forms">
      <h2>Rejected Forms</h2>
      {forms.length === 0 ? (
        <p>No forms rejected yet.</p>
      ) : (
        forms.map((form) => (
          <div key={form.id} className="form-item">
            <p>Form ID: {form.id}</p>
            <p>CNIC: {form.cnic}</p>
            <p>First Name: {form.fname}</p>
            <p>Last Name: {form.lname}</p>
            <p>Phone Number: {form.phone}</p>
            <p>Email: {form.email}</p>
            <p>Business Name: {form.bname}</p>
            <p>Business Address: {form.baddr}, {form.city}, {form.province}</p>
          </div>
        ))
      )}
    </div>
  );
};

// AdminPortal component
const AdminPortal = () => {
  const ReduxUser=useSelector((state)=>{
    return state.user;
  })
  console.log("ReduxUser in AppForms: ", ReduxUser);
  const acceptForm = async (id, org) => {
    //opens up a modal which accepts a pdf submission of inspection report
    //also increments status of form by 1 to indicate next organisation
  }

  const rejectForm = async (id) => {
    //opens up a modal which accepts a text input and a pdf submission of inspection report
    //does not change the status of the form
    //another field in the form table (mongodb) should be used as a flag to signify rejection status
  }

  //load forms
  useEffect(() => {
    async function fetchPendingForms() {
      // setPendingForms(testForms);
      // console.log(pendingForms);


      //forms with status === subadmin organisation
      console.log("subadmin's org before fetcing forms: ", ReduxUser.organisation);
      const pendingForms = await axios.get(`http://localhost:5000/getForms/${ReduxUser.organisation}`);
      console.log("forms retrieved: ",pendingForms.data);
      setPendingForms(pendingForms.data);
    }

    fetchPendingForms();
  }, []);

  //display accepted forms
  useEffect(() => {
    async function fetchAcceptedForms() {
    }

    fetchAcceptedForms();
  }, []);

  //display rejected forms
  useEffect(() => {
    async function fetchRejectedForms() {
       
    }

    fetchRejectedForms();
  }, []);

  const [pendingForms, setPendingForms] = useState([]);
  const [acceptedForms, setAcceptedForms] = useState([]);
  const [rejectedForms, setRejectedForms] = useState([]);
  const [showAcceptedForms, setShowAcceptedForms] = useState(false);
  const [showRejectedForms, setShowRejectedForms] = useState(false);
  const [showPendingForms, setShowPendingForms] = useState(false);

  const handleAccept = (id) => {
    const form = pendingForms.find((form) => form.id === id);
    acceptForm(Number(form.id), form.org);
  };

  const handleReject = (id) => {
    const form = pendingForms.find((form) => form.id === id);
    rejectForm(Number(form.id))
  };

  const handlePendingClick = () => {
    if (pendingForms.length === 0) {
      alert("No pending applications.");
    } else {
      setShowPendingForms(!showPendingForms);
    }
  };

  return (
    <div>
      <div className="admin-portal">
        <div className="main">
          <div className="first">
            <div>
              <h1 className="h1">{pendingForms.length}</h1>
            </div>
            <div className="first-div1">
              <p className="p">Pending Applications</p>
            </div>
            <div>
              <button className="button" onClick={handlePendingClick}>
                {showPendingForms ? "Hide Pending Applications" : "Open Pending Applications"}
              </button>
            </div>
          </div>
        </div>
        {showPendingForms && (
          <FormList
            orgId={ReduxUser.organisation}
            forms={pendingForms}
            onAccept={handleAccept}
            onReject={handleReject}
            title="Pending Forms"
          />
        )}

        {showPendingForms && (
          <div className="button-container">
            <div>
              <button
                className="btn"
                onClick={() => setShowAcceptedForms(!showAcceptedForms)}
              >
                {showAcceptedForms ? "Hide" : "Show"} Accepted Forms
              </button>
            </div>
            <div>
              <button
                className="btn"
                onClick={() => setShowRejectedForms(!showRejectedForms)}
              >
                {showRejectedForms ? "Hide" : "Show"} Rejected Forms
              </button>
            </div>
          </div>
        )}
        {showAcceptedForms && <AcceptedForms forms={acceptedForms} />}
        {showRejectedForms && <RejectedForms forms={rejectedForms} />}
      </div>
    </div>
  );
};

export default AdminPortal;
















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ApplicationForms.css";
// import TrackFormStatus from "../Tracking/Tracking";
// import { ComputationsAbi } from "../../ContractAbis/ComputationsAbi";
// import { ethers } from "ethers";
// import { useSelector } from "react-redux";

// const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// const organisations = ["DMA", "PFA", "Police Clearance", "Approved"];

// // FormItem component
// const FormItem = ({ form, onAccept, onReject }) => {
//   const [showMore, setShowMore] = useState(false);

//   const toggleShowMore = () => {
//     setShowMore(!showMore);
//   };

//   const toggleShowDocument = async (ipfsHash) => {
//     // Toggle the state to show or hide additional content
//     setShowMore(!showMore);
  
//     if (!showMore) {
      
//       try {
//         // Fetch the PDF file from IPFS using a gateway
//         const response = await fetch(`https://jade-bright-skunk-677.mypinata.cloud/ipfs/${ipfsHash}`);
//         const pdfBlob = await response.blob();
        
//         // Create a URL for the PDF file
//         const pdfUrl = URL.createObjectURL(pdfBlob);
        
//         // Open the PDF file in a new window or tab
//         window.open(pdfUrl, '_blank');
//       } catch (error) {
//         console.error('Error fetching PDF from IPFS:', error);
//       }
//     }
//   };
  

//   const handleReject = async (formId, email_) => {
//     try {
//       // Assuming the reason is hardcoded, you can customize it as needed
//       const reason = 'Your form was not complete';
//       const response = await axios.post('http://localhost:5000/send-rejection-email', {
//         email: email_,
//         reason: reason,
//       });
//       alert('Form Rejected!');
//       if (response.status !== 200) {
//         throw new Error('Error sending email');
//       }

//       // Call the original onReject function to update the form status
//       onReject(formId);
//     } catch (error) {
//       console.error('Error rejecting form:', error);
//     }
//   };

//   return (
//     <div className="form-item">
//       <p>Form ID: {form.id}</p>
//       <p>CNIC: {form.cnic}</p>
//       <p>First Name: {form.fname}</p>
//       <p>Last Name: {form.lname}</p>
//       <p>Phone Number: {form.phone}</p>
//       <p>Email: {form.email}</p>

//       {!showMore && (
//         <button className="btn" onClick={()=>toggleShowDocument(form.ipfsHash)}>
//           View Full Form
//         </button>
//       )}
//       {showMore && (
//         <div>
//           <p>Business Name: {form.bname}</p>
//           <p>Business Address: {form.baddr}, {form.city}, {form.province}</p>

//           <button className="btn" onClick={toggleShowMore}>
//             Less
//           </button>
//         </div>
//       )}
//       <div className="button-row">
//         <button className="btn" onClick={() => onAccept(form.id)}>
//           Accept
//         </button>
//         <button className="btn" onClick={() => handleReject(form.id, form.email)}>
//           Reject
//         </button>
//       </div>
//     </div>
//   );
// };

// // FormList component
// const FormList = ({ forms, onAccept, onReject, title }) => {
//   return (
//     <div className="form-list">
//       <h2>{title}</h2>
//       {forms.map((form) => (
//         <FormItem
//           key={form.id}
//           form={form}
//           onAccept={onAccept}
//           onReject={onReject}
//         />
//       ))}
//     </div>
//   );
// };

// // AcceptedForms and RejectedForms components
// const AcceptedForms = ({ forms }) => {
//   return (
//     <div className="accepted-forms">
//       <h2>Accepted Forms</h2>
//       {forms.length === 0 ? (
//         <p>No forms accepted yet.</p>
//       ) : (
//         forms.map((form) => (
//           <div key={form.id} className="form-item">
//             <p>Form ID: {form.id}</p>
//             <p>CNIC: {form.cnic}</p>
//             <p>First Name: {form.fname}</p>
//             <p>Last Name: {form.lname}</p>
//             <p>Phone Number: {form.phone}</p>
//             <p>Email: {form.email}</p>
//             <p>Business Name: {form.bname}</p>
//             <p>Business Address: {form.baddr}, {form.city}, {form.province}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// const RejectedForms = ({ forms }) => {
//   return (
//     <div className="rejected-forms">
//       <h2>Rejected Forms</h2>
//       {forms.length === 0 ? (
//         <p>No forms rejected yet.</p>
//       ) : (
//         forms.map((form) => (
//           <div key={form.id} className="form-item">
//             <p>Form ID: {form.id}</p>
//             <p>CNIC: {form.cnic}</p>
//             <p>First Name: {form.fname}</p>
//             <p>Last Name: {form.lname}</p>
//             <p>Phone Number: {form.phone}</p>
//             <p>Email: {form.email}</p>
//             <p>Business Name: {form.bname}</p>
//             <p>Business Address: {form.baddr}, {form.city}, {form.province}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// // AdminPortal component
// const AdminPortal = () => {

//   const ReduxUser=useSelector((state)=>{
//     return state.subadmin;
//   })
//   console.log("ReduxUser: ", ReduxUser);

//   const {ethereum} = window;
//   let contract;

//   const acceptForm = async (id, org) => {
//     const provider = new ethers.JsonRpcProvider("http://localhost:8545");
//     const signer = await getContractSigner(provider);
//     contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
//     const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };

//     //get name of next org
//     console.log("curr org: ", org);
//     const index = organisations.indexOf(org);
//     console.log("curr org index: ", index);
//     if(index < organisations.length-1){
//         org = organisations[index+1]
//     }
//     else {
//         org = organisations[index]
//     }
//     console.log("next org: ", org)

//     try{
//         //await contract.acceptForm(1, org, options); // Wait for the transaction to be mined
//         await contract.acceptForm(id, org, options);
//         console.log("contract after accepted: ", contract)
//         console.log("Form accepted successfully");
//         console.log("contract address: ",contract.target);
//         console.log("signers address: ", await signer.getAddress());
//         alert("form accept successfully");
//     }
//     catch(e){
//         console.error("Form cannot be accepted: ", e);
//         alert("Form cannot be accepted");
//     }
    
// }

//   const rejectForm = async (id) => {
//     const provider = new ethers.JsonRpcProvider("http://localhost:8545");
//     const signer = await getContractSigner(provider);
//     contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
//     const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };  

//     try{
//         //await contract.acceptForm(1, org, options); // Wait for the transaction to be mined
//         await contract.rejectForm(id, options);
//         console.log("Form rejected successfully");
//         console.log("contract address: ",contract.target);
//         console.log("signers address: ", await signer.getAddress());
//         alert("form status set to rejected in blockchain successfully");
//     }
//     catch(e){
//         console.error("Form cannot be accepted: ", e);
//         alert("Form cannot be accepted");
//     }
    
//   }

//   //load forms
//   useEffect(() => {
//     async function fetchPendingForms() {
//         if (window.ethereum) {
//             const provider = new ethers.JsonRpcProvider("http://localhost:8545");

//             const signer = await getContractSigner(provider);
//             console.log("current signer for listing: ", await signer.getAddress());
//             const contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);

//             const count = await contract.formCount();
//             console.log("count of forms: ", count);

//             const newForms = new Set();
//             let data;
//             for (let index = 1; index <= count; index++) {
//                 data = await contract.listForm(index);
//                 //filters go here
                
//                 if(data[13] === "pending" && data[12] === ReduxUser.organisation){
//                   console.log("reduxeUser Org: ", ReduxUser.organisation)
//                   console.log("data status: ", data[13])
//                   console.log("data org: ", data[12])
//                     //newForms.add(data.toString());
//                     newForms.add({
//                       id: data[0].toString(),
//                       cnic: data[1],
//                       fname: data[2],
//                       lname: data[3],
//                       phone: data[4],
//                       email:data[5],
//                       bname: data[6],
//                       baddr: data[7],
//                       city: data[8],
//                       province: data[9],
//                       ipfsHash: data[10],
//                       walletAdrr: data[11],
//                       org: data[12],
//                       status: data[13]
//                     })
//                     console.log("Printing data retrieved from blockchain: ",newForms);
//                 }
//                 //newForms.add(data.toString());
//             }
//             const arrayOfObjects = Array.from(newForms);
//             setPendingForms(arrayOfObjects);
//         } else {
//             console.error("MetaMask not detected");
//         }
//     }

//     fetchPendingForms();
//   }, []);

//   //display accepted forms
//   useEffect(() => {
//     async function fetchAcceptedForms() {
//         if (window.ethereum) {
//             const provider = new ethers.JsonRpcProvider("http://localhost:8545");

//             const signer = await getContractSigner(provider);
//             console.log("current signer for listing: ", await signer.getAddress());
//             const contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);

//             const count = await contract.formCount();
//             console.log("count of forms: ", count);

//             const newForms = new Set();
//             let data;
//             let org1;
//             console.log("Accepted print organisation of subadmin: ", ReduxUser.organisation)
//             const index = organisations.indexOf(ReduxUser.organisation);
//             console.log("Accepted print index of organisation of subadmin: ", index)
//             if(index < organisations.length-1){
//                 org1 = organisations[index+1]
//             }
//             else{
//                 org1 = organisations[index]
//             }
//             console.log("printing accepted forms org after ifs: ",org1);
//             for (let index = 1; index <= count; index++) {
//                 data = await contract.listForm(index);
//                 //filters go here
//                 if(data[12] === org1){
//                     //newForms.add(data.toString());
//                     newForms.add({
//                       id: data[0].toString(),
//                       cnic: data[1],
//                       fname: data[2],
//                       lname: data[3],
//                       phone: data[4],
//                       email:data[5],
//                       bname: data[6],
//                       baddr: data[7],
//                       city: data[8],
//                       province: data[9],
//                       ipfsHash: data[10],
//                       walletAdrr: data[11],
//                       org: data[12],
//                       status: data[13]
//                     })
//                     console.log("Printing data retrieved from blockchain: ",newForms);
//                 }
//                 //newForms.add(data.toString());
//             }
//             const arrayOfObjects = Array.from(newForms);
//             setAcceptedForms(arrayOfObjects);
//         } else {
//             console.error("MetaMask not detected");
//         }
//     }

//     fetchAcceptedForms();
//   }, []);

//   // //display rejected forms
//   useEffect(() => {
//     async function fetchRejectedForms() {
//         if (window.ethereum) {
//             const provider = new ethers.JsonRpcProvider("http://localhost:8545");

//             const signer = await getContractSigner(provider);
//             console.log("current signer for listing: ", await signer.getAddress());
//             const contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);

//             const count = await contract.formCount();
//             console.log("count of forms: ", count);

//             const newForms = new Set();
//             let data;


//             for (let index = 1; index <= count; index++) {
//                 data = await contract.listForm(index);
//                 //filters go here
//                 if(data[13] === "rejected" && data[12] === ReduxUser.organisation){
//                     //newForms.add(data.toString());
//                     newForms.add({
//                       id: data[0].toString(),
//                       cnic: data[1],
//                       fname: data[2],
//                       lname: data[3],
//                       phone: data[4],
//                       email:data[5],
//                       bname: data[6],
//                       baddr: data[7],
//                       city: data[8],
//                       province: data[9],
//                       ipfsHash: data[10],
//                       walletAdrr: data[11],
//                       org: data[12],
//                       status: data[13]
//                     })
//                     console.log("Printing data retrieved from blockchain: ",newForms);
//                 }
//                 //newForms.add(data.toString());
//             }
//             const arrayOfObjects = Array.from(newForms);
//             setRejectedForms(arrayOfObjects);
//         } else {
//             console.error("MetaMask not detected");
//         }
//     }

//     fetchRejectedForms();
//   }, []);

//   const [pendingForms, setPendingForms] = useState([]);
//   const [acceptedForms, setAcceptedForms] = useState([]);
//   const [rejectedForms, setRejectedForms] = useState([]);
//   const [showAcceptedForms, setShowAcceptedForms] = useState(false);
//   const [showRejectedForms, setShowRejectedForms] = useState(false);
//   const [showPendingForms, setShowPendingForms] = useState(false);

//   const handleAccept = (id) => {
//     const form = pendingForms.find((form) => form.id === id);
//     acceptForm(Number(form.id), form.org);
//   };

//   const handleReject = (id) => {
//     const form = pendingForms.find((form) => form.id === id);
//     //blockchain rejection code
//     rejectForm(Number(form.id))
//   };

//   const handlePendingClick = () => {
//     if (pendingForms.length === 0) {
//       alert("No pending applications.");
//     } else {
//       setShowPendingForms(!showPendingForms);
//     }
//   };

//   const dummyFunc = async()=>{
//     const provider = new ethers.JsonRpcProvider("http://localhost:8545");
//     const signer = await getContractSigner(provider);
//     contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
//     const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };

//     try{
//         await contract.acceptForm(1, "Approved", options);
//         console.log("contract after accepted: ", contract)
//         console.log("Form accepted successfully");
//         console.log("contract address: ",contract.target);
//         console.log("signers address: ", await signer.getAddress());
//         alert("form accept successfully");
//     }
//     catch(e){
//         console.error("Form cannot be accepted: ", e);
//         alert("Form cannot be accepted");
//     }
//   }

//   const getContractSigner = async(provider) => {
//     if(window.ethereum){
//         //console.log("provider inside function: ", provider.listAccounts());
//         let signer = await ethereum.request({method: "eth_requestAccounts"});
//         signer = signer[0];
        
//         //console.log("acc receieved from metamask: ", signer);
//         let prov;
//         for (let index = 0; index < 20; index++) {
//             prov = await provider.getSigner(index);
//             //console.log("prov %d inside loop: ", index, await prov.getAddress());
//             prov = await prov.getAddress();
//             //console.log("signer inside loop: ", signer);
//             if(signer.toUpperCase() === prov.toUpperCase()){
//                 //console.log("matched prov: ", prov);
//                 return await provider.getSigner(index);
//             }
//         }
//     }
//   }

  

//   return (
//     <div>
//       <div className="admin-portal">
//         {/* <h1>Admin Portal</h1> */}
//         <div className="main">
//           <div className="first">
//             <div>
//               <h1 className="h1">{pendingForms.length}</h1>
//             </div>
//             <div className="first-div1">
//               <p className="p">Pending Applications</p>
//             </div>
//             <div>
//               <button className="button" onClick={handlePendingClick}>
//                 {showPendingForms ? "Hide Pending Applications" : "Open Pending Applications"}
//               </button>
//             </div>
//           </div>
//         </div>
//         {showPendingForms && (
//           <FormList
//             forms={pendingForms}
//             onAccept={handleAccept}
//             onReject={handleReject}
//             title="Pending Forms"
//           />
//         )}

//         {showPendingForms && (
//           <div className="button-container">
//             <div>
//               <button
//                 className="btn"
//                 onClick={() => setShowAcceptedForms(!showAcceptedForms)}
//               >
//                 {showAcceptedForms ? "Hide" : "Show"} Accepted Forms
//               </button>
//             </div>
//             <div>
//               <button
//                 className="btn"
//                 onClick={() => setShowRejectedForms(!showRejectedForms)}
//               >
//                 {showRejectedForms ? "Hide" : "Show"} Rejected Forms
//               </button>
//             </div>
//           </div>
//         )}
//         {showAcceptedForms && <AcceptedForms forms={acceptedForms} />}
//         {showRejectedForms && <RejectedForms forms={rejectedForms} />}
//       </div>

//       <div>
//         <button onClick={dummyFunc}>approve form</button>
//         {/* <TrackFormStatus forms={[...pendingForms, ...acceptedForms, ...rejectedForms]} /> */}
//       </div>
//     </div>
//   );
// };

// export default AdminPortal;