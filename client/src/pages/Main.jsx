import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import {ComputationsAbi} from '../ContractAbis/ComputationsAbi';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function Main(){

    const organisations = ["DMA", "PFA", "Police Clearance"];

    const {ethereum} = window;

    const[para1, setPara1] = useState('');
    const[para2, setPara2] = useState('');
    const [forms, setForms] = useState(new Set());

    // const[ids, setIds] = useState([]);
    // const[cnics, setCnics] = useState([]);
    // const[owners, setOwners] = useState([]);
    // const[states, setStates] = useState([]);

    const connectMetamask = async () => {
        if(window.ethereum !== "undefined"){
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            console.log(accounts[0]);
            setPara1(accounts[0]);
        }
    }

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

    const connectContract = async () => {
        const provider = new ethers.JsonRpcProvider("http://localhost:8545");
        const signer = await getContractSigner(provider);

        contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);

        const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };
        await contract.addForm("sam1",options)
        console.log("contract address: ",contract.target);
        console.log("signers address: ", await signer.getAddress());
    }

    const addForm = async () => {
        const provider = new ethers.JsonRpcProvider("http://localhost:8545");
        const signer = await getContractSigner(provider);

        contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
        const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") }; //0.02

        try{
            await contract.addForm("sam2", options); // Wait for the transaction to be mined
            console.log("Form added successfully");
            console.log("contract address: ",contract.target);
            console.log("signers address: ", await signer.getAddress());
            alert("form added successfully");
        } catch(e) {
            console.error("Form cannot be added at the moment: ", e);
            alert("Form cannot be added at the moment");
        }
        
    }

    const cancelForm = async () => {
        const provider = new ethers.JsonRpcProvider("http://localhost:8545");
        const signer = await getContractSigner(provider);
        contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
        const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };

        try{
            await contract.cancelForm(3, options); // Wait for the transaction to be mined
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

    const acceptForm = async () => {
        const provider = new ethers.JsonRpcProvider("http://localhost:8545");
        const signer = await getContractSigner(provider);
        contract = new ethers.Contract(contractAddress, ComputationsAbi, signer);
        const options = { gasLimit: 2000000, gasPrice: ethers.parseUnits("20", "gwei") };

        //get name of next org

        //current org that is handling form is DMA
        let org = "Pol";
        const index = organisations.indexOf(org);
        if(index < organisations.length-1){
            org = organisations[index+1]
        }
        else if(index === organisations.length-1){
            org = organisations[index]
        }
        

        try{
            //await contract.acceptForm(1, org, options); // Wait for the transaction to be mined
            await contract.acceptForm(1, org, options);
            console.log("Form accepted successfully");
            console.log("contract address: ",contract.target);
            console.log("signers address: ", await signer.getAddress());
            alert("form accept successfully");
        }
        catch(e){
            console.error("Form cannot be accepted: ", e);
            alert("Form cannot be accepted");
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
                    data = await contract.listForm(index);
                    //filters go here
                    // if(data[3] !== "cancelled"){
                    //     newForms.add(data.toString());
                    // }
                    newForms.add(data.toString());
                }
                setForms(newForms);
            } else {
                console.error("MetaMask not detected");
            }
        }

        fetchData();
    }, []);

    return(
        <div>
            <button onClick={connectMetamask}>Connect Metamask</button>
            <p>{para1}</p>

            <button onClick={connectContract}>Connect Contract</button>
            <p>{para2}</p>

            <button onClick={cancelForm}>Cancel Form</button>

            <button onClick={addForm}>Add Form</button>

            <h1>Filtered Forms</h1>
            <ul>
            {[...forms].map((form, index) => (
                    <li key={index}><button onClick={acceptForm}>{form}</button></li>
                ))}
            </ul>
        </div>
    )
}