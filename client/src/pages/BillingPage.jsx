import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function BillingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    //retrieve formId from previous page
    useEffect(() => {
        if (location.state?.formId) {
        console.log("Form ID received in billing: ", location.state.formId);
        // You can now use the formId for any necessary operations
        }
    }, [location.state]);

    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [proofFile, setProofFile] = useState(null);
    const [submittedProofs, setSubmittedProofs] = useState({});
    const [notification, setNotification] = useState(""); // State for notifications

    const billItems = [
        { 
            label: "Platform fee", amount: "500 PKR", 
            accountName: "Platform Services", accountNumber: "1234567890", bankName: "Meezan Bank" 
        },
        { 
            label: "Police Khidmat Markaz", amount: "1,000 PKR", 
            accountName: "Police Services", accountNumber: "2345678901", bankName: "Allied Bank" 
        },
        { 
            label: "DTS", amount: "40,000 PKR", 
            accountName: "DTS Corp", accountNumber: "3456789012", bankName: "Allied Bank" 
        },
        { 
            label: "LDA", amount: "10,000 PKR", 
            accountName: "LDA Fund", accountNumber: "4567890123", bankName: "Faysal Bank" 
        },
        { 
            label: "LDA (Town Planning)", amount: "10,000 PKR", 
            accountName: "LDA Town Planning", accountNumber: "5678901234", bankName: "Al-Falah Bank" 
        },
        { 
            label: "LDA (TEPA)", amount: "100,000 PKR", 
            accountName: "LDA TEPA", accountNumber: "6789012345", bankName: "MCB Bank" 
        },
        { 
            label: "LDA (EPA)", amount: "150,000 PKR", 
            accountName: "LDA EPA", accountNumber: "7890123456", bankName: "Standard Chartered Bank" 
        },
        { 
            label: "LDA (WASA)", amount: "75,000 PKR", 
            accountName: "LDA WASA", accountNumber: "8901234567", bankName: "Habib Bank" 
        },
    ];

    const handleBillClick = (bill) => {
        setSelectedBill(bill);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedBill(null);
        setProofFile(null);
        setNotification(""); // Clear notification when closing the popup
    };

    const handleProofFileChange = (event) => {
        setProofFile(event.target.files[0]);
    };

    const submitProof = async () => {
        if (!proofFile) {
            setNotification("Please upload a proof of transfer."); // Set notification message
            return;
        }

        const proofData = new FormData();
        proofData.append('file', proofFile);
        proofData.append('bill', selectedBill.label);
        proofData.append('formGId', location.state.formId);

        try {
            const response = await axios.post('http://localhost:5000/uploadProof', proofData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNotification("Proof of transfer submitted successfully!"); // Set success message

            // Mark this bill as submitted
            setSubmittedProofs((prev) => ({ ...prev, [selectedBill.label]: true }));
            closePopup();
        } catch (error) {
            console.error("Error uploading proof:", error);
            setNotification("Failed to submit proof of transfer."); // Set error message
        }
    };

    const submitForm = () => {
        // Check if all proofs are submitted
        const allSubmitted = billItems.every((item) => submittedProofs[item.label]);

        if (!allSubmitted) {
            setNotification("Please ensure all proofs are submitted before proceeding."); // Set error message
            return;
        }

        // Navigate to the home page if all proofs are submitted
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-custom-blue mb-6 text-center">Itemized Bill</h1>

                {/* Display Notification */}
                {notification && (
                    <div className="mb-4 text-red-600 text-center">{notification}</div>
                )}
                
                {billItems.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleBillClick(item)}
                        className={`mb-2 text-lg flex justify-between border-b border-gray-300 py-2 cursor-pointer 
                            ${submittedProofs[item.label] ? 'text-green-600' : 'hover:text-blue-600'}`}
                    >
                        <span>{item.label}:</span> <span>{item.amount}</span>
                    </div>
                ))}

                <div className="text-xl font-semibold text-custom-blue mt-6 flex justify-between border-t border-gray-300 pt-4">
                    <span>Your total bill is:</span> <span>368,500 PKR</span>
                </div>
                
                <button 
                    onClick={submitForm} 
                    className="mt-6 w-full bg-custom-blue text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Submit
                </button>

                {popupVisible && selectedBill && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h2 className="text-xl font-bold mb-4">Transfer Details for {selectedBill.label}</h2>
                            <p className="mb-2"><strong>Account Name:</strong> {selectedBill.accountName}</p>
                            <p className="mb-2"><strong>Account Number:</strong> {selectedBill.accountNumber}</p>
                            <p className="mb-4"><strong>Bank Name:</strong> {selectedBill.bankName}</p>

                            <label className="block mb-2 font-semibold">Upload Proof of Transfer:</label>
                            <input 
                                type="file" 
                                onChange={handleProofFileChange} 
                                className="mb-4"
                                accept="image/*"
                            />

                            <button 
                                onClick={submitProof} 
                                className="w-full bg-custom-blue text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mb-2"
                            >
                                Submit Proof
                            </button>
                            <button 
                                onClick={closePopup} 
                                className="w-full bg-custom-blue text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
