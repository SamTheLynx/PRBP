import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import jsPDF from 'jspdf';
import "./UserCertificateList.css"

const CertificateItem = (props) => {
    const navigate = useNavigate();
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`Certificate ID: ${props.id}`, 10, 10);
        doc.text(`Business Name: ${props.name}`, 10, 20);
        doc.text(`Business Address: ${props.dos}`, 10, 30);
        doc.text(`Progress: ${props.progress}`, 10, 40);
        doc.save(`certificate_${props.id}.pdf`);
    };

    const gotonext = ()=>{
        navigate('/ownershipTransfer', { state: { id: props.id, name: props.name, dos: props.dos, progress: props.progress }});
    }

    let btn;
    if (props.progress === 'processed') {
        btn = (
            <>
                <button className="btn-normal" onClick={generatePDF}>
                    Download PDF
                </button>
               <button className='btn-normal' onClick={gotonext}>Transfer Ownership</button>
            </>
        );
    } else if (props.progress === 'pending') {
        btn = (
            <button className="btn-transparent" onClick={props.clicked}>
                X
            </button>
        );
    } else {
        btn = null;
    }

    return (
        <>
            <div className="main-item-container">
                <p>{props.id}</p>
                <div className="vertical-line"></div>
                <p>{props.name}</p>
                <div className="vertical-line"></div>
                <p>{props.dos}</p>
                <div className="vertical-line"></div>
                <p>{props.progress}</p>
                <div className="vertical-line"></div>
                {btn}
            </div>
        </>
    );
};

export default CertificateItem;









// import "./UserCertificateList.css"
// import { Link } from 'react-router-dom'


// export default function UserCertificateList(props){
//     if(props.progress==="processed"){
//         let btn;
//         if(props.progress === "processed"){
//             btn = <Link to={`/download/${props.id}/${props.name}`}><button className="btn-normal">Download</button></Link>;
//         }
//         else if(props.progress === "Pending"){
//             btn = <button className="btn-transparent" onClick={props.clicked}>X</button>;
//         }
//         else{
//             btn = null;
//         }
//         return(
//           <>
//               <div className='main-item-container'>
//                 <p>{props.id}</p>
//                 <div className="vertical-line"></div>
//                 <p>{props.name}</p>
//                 <div className="vertical-line"></div>
//                 <p>{props.dos}</p>
//                 <div className="vertical-line"></div>
//                 <p>{props.progress}</p>
//                 <div className="vertical-line"></div>
//                 {btn}
//               </div>
//           </>
//         )
//     }
//     else{
//         return(
//             <></>
//         )
//     }
   
//   }