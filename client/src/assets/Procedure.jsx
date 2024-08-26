import React from "react";
import flowchartImage from '../../assets/flowchart.png';


const Procedure = () => {
  return (
    <div className="bg-procedure">
    <div className="max-w-2xl mx-auto p-4 ">
      <h2 className="text-2xl font-bold text-center text-custom-blue mb-8">
        Procedure 
      </h2>


    <div className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
    <h2 className="text-center text-custom-blue text-2xl mb-6">General Flow</h2>
    <img src={flowchartImage} alt="General User Flowchart" className="w-1/2 h-auto mx-auto" />
    </div>

 
    <div className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
      <h2 className="text-center text-custom-blue text-2xl mb-6">Keep these documents ready before application</h2>
    <body>
      <ol>
       <li style={{marginBottom : '10px'}}>1- Medical Fitness Certificate of each employee on the prescribed Form-I from a Registered Medical Practitioner.</li>
       <li style={{marginBottom : '10px'}}>2- Building Plan of Restaurant.</li>
       <li style={{marginBottom : '10px'}}>3- Room rates / copy of Menu Card or rate list.</li>
       <li style={{marginBottom : '10px'}}>4- Copy of NIC of the Proprietor/Partners/Directors/Chief Executive/General Manager.</li>
       <li style={{marginBottom : '10px'}}>5- Attested copies of Lease Agreement / Proof of Ownership of Hotel/Restaurant premises.</li>
       <li style={{marginBottom : '10px'}}>6- In case of a Partnership Firm, attested copies of Registration Certificate and Partnership Deed duly certified by the Registrar of Firms.</li>
       <li style={{marginBottom : '10px'}}>7- In case of a Limited Company, attested copies of Incorporation Certificate, Memorandum and Articles of Association, Form-A and Form–29 duly certified by the Registrar of Companies.</li>
     </ol>
   </body>
    </div>
    </div>
    </div>
  );
};

export default Procedure;
