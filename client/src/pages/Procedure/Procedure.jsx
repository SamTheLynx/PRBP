import React from "react";
import "./Procedure.css";

const stepsData = [
  {
    stepNo: 1,
    title: "Verify Your Account",
    detail:
      "Click on your profile and hit the verify button to verify your CNIC and account. The system will automatically grab needed information from NADRA website.",
  },
  {
    stepNo: 2,
    title: "Get Your Lease Agreement Ready",
    detail:
      "This website can only automate so much. You will have to get a site ready to build your business upon and ready the documents.",
  },
  {
    stepNo: 3,
    title: "Fill in the Application Form",
    detail:
      "Fill the application form. Attach all the required documents",
  },
];

const Procedure = () => {
  return (
    <div className="procedure-main">
      <h2 className="procedure-title">Procedure Steps</h2>
      {stepsData.map((step) => (
        <div key={step.stepNo} className="step">
          <div>
            <h3 className="step-no">Step {step.stepNo}</h3>
          </div>
          <div>
            <h3 className="title">{step.title}</h3>
            <p className="detail">{step.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Procedure;
