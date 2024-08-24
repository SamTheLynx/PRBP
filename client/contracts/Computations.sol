// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Computations{
    // Model a Certificate
    struct Form {
        uint256 id;
        string cnic;
        string fname;
        string lname;
        string phone;
        string email;
        string bname;
        string baddr;
        string city;
        string province;
        string ipfsHash;
        address payable ownerWalletAddr;
        string org; //"DMA", "PFA", "Police Clearance"
        string state; //"pending", "processed", "rejected"
    }

    string public myCity = "Lahore";

    // Read/write forms
    mapping(uint256 => Form) public forms;
    
    // Store form Count
    uint256 public formCount;

    //events
    // event FormAdded(uint256 id, string cnic, address ownerWalletAddr, string state);
    // event FormCancelled(uint256 id, string cnic, address ownerWalletAddr, string state);
    // event FormAccepted(uint256 id, string cnic, address ownerWalletAddr, string state);
    // event FormRejected(uint256 id, string cnic, address ownerWalletAddr, string state);
    // event FormCompleted(uint256 id, string cnic, address ownerWalletAddr, string state);


    constructor() {
        addForm("35202-1234567-8", "faiqa", "adnan", "0300-1234567", "faiqa@gmail.com", "KFC", "123 Johar Town", "Lahore", "Punjab", "QmS7NcEmYz3hnpPAzyA1iNwtA2Hu7v5yP55HzrRsH5azEi");
        addForm("35202-1111567-8", "sana", "yasir", "0300-1234444", "sanayasir1320@gmail.com", "Mcdonalds", "34 C Model Town", "Lahore", "Punjab", "QmeaJS9xEPT3HRuXpncPgyhD1Gaz9NizgSTaZuC7C9goLL");
        addForm("35202-1435247-8", "ayesha", "ahmed", "0301-4325643", "ayesha@gmail.com", "Cheezious", "98 I-10", "Islamabad", "Islamabad Capital Territory", "QmdPXPFkw43S8dG6wjeRCP6EpuXKu4Lr1wmk5MqTqQQwCf");
    }

    //, string memory _fname, string memory _lname, string memory _phone, string memory _bname, string memory _baddr, string memory _city, string memory _province
    function addForm (string memory _cnic, string memory _fname, string memory _lname, string memory _phone, string memory _email, string memory _bname, string memory _baddr, string memory _city, string memory _province, string memory _ipfsHash) public {
    	// Check if businessName is unique
    	for (uint256 i = 1; i <= formCount; i++) {
        	require(keccak256(bytes(forms[i].cnic)) != keccak256(bytes(_cnic)),
            "Business name must be unique");
    	}

        formCount++;
        // _fname, _lname, _phone, _bname, _baddr, _city, _province,
        forms[formCount] = Form(formCount, _cnic, _fname, _lname, _phone, _email, _bname, _baddr, _city, _province, _ipfsHash, payable(msg.sender), "DMA", "pending");

        //emit FormAdded(formCount, _cnic, msg.sender, "DMA");
    }

    //getForm for rendering all forms
    function listForm(uint256 _id) public view returns (uint256, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, address payable, string memory, string memory){
        Form storage form = forms[_id];
        return(form.id,
            form.cnic,
            form.fname,
            form.lname,
            form.phone,
            form.email,
            form.bname,
            form.baddr,
            form.city,
            form.province,
            form.ipfsHash,
            form.ownerWalletAddr,
            form.org,
            form.state);
    }

    function transferOwnership(uint256 _id, string memory _cnic, string memory _fname, string memory _lname, string memory _phone, string memory _email) public{
        //check if business owner is sending form to self
        require(forms[_id].ownerWalletAddr != msg.sender,"Cannot send form to self");
        require(keccak256(bytes(forms[_id].email)) != keccak256(bytes(_email)));
        require(keccak256(bytes(forms[_id].cnic)) != keccak256(bytes(_cnic)));

        //check if form is processed fully
        require(keccak256(bytes(forms[_id].state)) != keccak256(bytes("processed")));

        forms[_id].cnic = _cnic;
        forms[_id].fname = _fname;
        forms[_id].lname = _lname;
        forms[_id].phone = _phone;
        forms[_id].email = _email;
    }

    //getForm for user searching/tracking page
    function getForm(uint256 _id) public view returns (uint256, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, address payable, string memory, string memory){
        //form id is within bounds
        require(_id > 0 && _id <= formCount, "id out of bounds");

        //form is only accessed by owner
        require(forms[_id].ownerWalletAddr == msg.sender, "You are not the owner of this form");
        //require(keccak256(bytes(forms[_id].email)) != keccak256(bytes(_email)));

        Form storage form = forms[_id];
        return(form.id,
            form.cnic,
            form.fname,
            form.lname,
            form.phone,
            form.email,
            form.bname,
            form.baddr,
            form.city,
            form.province,
            form.ipfsHash,
            form.ownerWalletAddr,
            form.org,
            form.state);
    }

    function cancelForm(uint256 _id) public {
        //form id is within bounds
        require(_id > 0 && _id <= formCount);

        //form is only accessed by owner
        require(forms[_id].ownerWalletAddr == msg.sender);

        //form is not already cancelled
        require(keccak256(bytes(forms[_id].state)) != keccak256(bytes("cancelled")),"Form already cancelled");

        forms[_id].state = "cancelled";

        //emit FormCancelled(_id, forms[_id].cnic, forms[_id].ownerWalletAddr, "cancelled");
    }

    function acceptForm(uint256 _id, string memory _org) public {
        //form id is within bounds
        require(_id > 0 && _id <= formCount);

        //form is not already cancelled
        require(keccak256(bytes(forms[_id].state)) != keccak256(bytes("cancelled")),"Form already cancelled");

        forms[_id].org = _org;

        if(keccak256(bytes(forms[_id].org)) == keccak256(bytes("Approved"))){
            forms[_id].state = "processed";
        }

        //emit FormAccepted(_id, forms[_id].cnic, forms[_id].ownerWalletAddr, org);
    }

    function rejectForm(uint256 _id) public {
        //form id is within bounds
        require(_id > 0 && _id <= formCount);

        //form is not already cancelled
        require(keccak256(bytes(forms[_id].state)) != keccak256(bytes("cancelled")),"Form already cancelled");

        forms[_id].state = "rejected";

        //emit FormRejected(_id, forms[_id].cnic, forms[_id].ownerWalletAddr, "rejected");
    }

    function completeForm(uint256 _id) public {
        //form id is within bounds
        require(_id > 0 && _id <= formCount);

        //form is not already cancelled
        require(keccak256(bytes(forms[_id].state)) != keccak256(bytes("cancelled")),"Form already cancelled");

        forms[_id].state = "completed";

        //emit FormCompleted(_id, forms[_id].cnic, forms[_id].ownerWalletAddr, "completed");
    }

    //transfer Ownership to someone else
    function transferOwnership (uint256 _id, string memory _cnic, string memory _fname, string memory _lname, string memory _phone, string memory _email, address payable _walletAddr) public {
    	require(forms[_id].ownerWalletAddr != _walletAddr, "can't transfer to self");

        forms[_id].cnic = _cnic;
        forms[_id].fname = _fname;
        forms[_id].lname = _lname;
        forms[_id].phone = _phone;
        forms[_id].email = _email;
        forms[_id].ownerWalletAddr = _walletAddr;
    }



    //only for business owners / users
    function filterFormsByCnic(string memory _cnic) public view returns (uint256[] memory, string[] memory, address payable[] memory, string[] memory){
        uint256 matchCount = 0;

        // Count the number of matching forms
        for (uint256 i = 1; i <= formCount; i++) {
            if (keccak256(bytes(forms[i].cnic)) == keccak256(bytes(_cnic))) {
                matchCount++;
            }
        }

        // Create arrays with the size of matchCount
        uint256[] memory ids = new uint256[](matchCount);
        string[] memory cnics = new string[](matchCount);
        address payable[] memory owners = new address payable[](matchCount);
        string[] memory states = new string[](matchCount);

        uint256 index = 0;
        // Populate the arrays with matching forms
        for (uint256 i = 1; i <= formCount; i++) {
            if (keccak256(bytes(forms[i].cnic)) == keccak256(bytes(_cnic))) {
                //check if the status is not cancelled
                if(keccak256(bytes(forms[i].state)) != keccak256(bytes("cancelled"))){
                    ids[index] = forms[i].id;
                    cnics[index] = forms[i].cnic;
                    owners[index] = forms[i].ownerWalletAddr;
                    states[index] = forms[i].state;
                    index++;
                }
            }
        }

        return (ids, cnics, owners, states);
    }

    //for sub admin side
    function filterFormsByStatus(string memory _state) public view returns (uint256[] memory, string[] memory, address payable[] memory, string[] memory){
        uint256 matchCount = 0;

        // Count the number of matching forms
        for (uint256 i = 1; i <= formCount; i++) {
            if (keccak256(bytes(forms[i].state)) == keccak256(bytes(_state))) {
                matchCount++;
            }
        }

        // Create arrays with the size of matchCount
        uint256[] memory ids = new uint256[](matchCount);
        string[] memory cnics = new string[](matchCount);
        address payable[] memory owners = new address payable[](matchCount);
        string[] memory states = new string[](matchCount);

        uint256 index = 0;
        // Populate the arrays with matching forms
        for (uint256 i = 1; i <= formCount; i++) {
            //check if the status is not cancelled
            if (keccak256(bytes(forms[i].state)) == keccak256(bytes(_state))) {
                //check if the status is not cancelled
                if(keccak256(bytes(forms[i].state)) != keccak256(bytes("cancelled"))){
                    ids[index] = forms[i].id;
                    cnics[index] = forms[i].cnic;
                    owners[index] = forms[i].ownerWalletAddr;
                    states[index] = forms[i].state;
                    index++;
                }
            }
        }

        return (ids, cnics, owners, states);
    }

    function getAllForms() public view returns (uint256[] memory, string[] memory, address payable[] memory, string[] memory){
        // Create arrays with the size of formCount
        uint256[] memory ids = new uint256[](formCount);
        string[] memory cnics = new string[](formCount);
        address payable[] memory owners = new address payable[](formCount);
        string[] memory states = new string[](formCount);

        // Populate the arrays with matching forms
        for (uint256 i = 1; i <= formCount; i++) {
            ids[i] = forms[i].id;
            cnics[i] = forms[i].cnic;
            owners[i] = forms[i].ownerWalletAddr;
            states[i] = forms[i].state;
        }

        return (ids, cnics, owners, states);
    }
}