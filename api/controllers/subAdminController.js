// controllers/subadminController.js
const Staff = require('../models/Staff');

// Create Subadmin
const createSubadmin = async (req, res) => {
  const { fname, lname, email, password, cnic, phone, organisation } = req.body;

  // Check if the subadmin already exists
  const subadminExists = await Staff.findOne({ email });
  if (subadminExists) {
    return res.status(400).json({ message: 'Subadmin already exists' });
  }

  // Create new subadmin
  const subadmin = await Staff.create({
    fname,
    lname,
    email,
    password,
    cnic,
    phone,
    organisation, // Specific to subadmins
    designation: 'subadmin',
    roles: ['update', 'accept', 'reject'],
  });

  if (subadmin) {
    res.status(201).json({
      _id: subadmin._id,
      fname: subadmin.fname,
      lname: subadmin.lname,
      email: subadmin.email,
      designation: subadmin.designation,
      organisation:subadmin.organisation,
      roles: subadmin.roles,
    });
  } else {
    res.status(400).json({ message: 'Invalid subadmin data' });
  }
};


// Update Subadmin
const updateSubadminProfile = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, email, cnic, phone, organisation } = req.body;

  const subadmin = await Staff.findById(id);

  if (subadmin && subadmin.designation === 'subadmin') {
    subadmin.fname = fname || subadmin.fname;
    subadmin.lname = lname || subadmin.lname;
    subadmin.email = email || subadmin.email;
    subadmin.cnic = cnic || subadmin.cnic;
    subadmin.phone = phone || subadmin.phone;
    subadmin.cnic = cnic || subadmin.cnic;
    subadmin.organisation = organisation || subadmin.organisation; // Specific to subadmins

    const updatedSubadmin = await subadmin.save();
    res.status(200).json({
      _id: updatedSubadmin._id,
      fname: updatedSubadmin.fname,
      lname: updatedSubadmin.lname,
      email: updatedSubadmin.email,
      roles: updatedSubadmin.roles,
    });
  } else {
    res.status(404).json({ message: 'Subadmin not found' });
  }
};

// Function to get all Subadmins
const getSubadminsList = async (req, res) => {
  try {
    // Query to find all staff members with the designation 'subadmin'
    const subadmins = await Staff.find({ designation: 'subadmin' });

    if (subadmins.length === 0) {
      return res.status(404).json({ message: 'No subadmins found' });
    }

    // Send the subadmins as the response
    res.status(200).json(subadmins);
  } catch (error) {
    console.error('Error retrieving subadmins:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



// Delete Subadmin
const deleteSubadmin = async (req, res) => {
  const { id } = req.params;

  const subadmin = await Staff.findById(id);

  if (subadmin && subadmin.designation === 'subadmin') {
    await subadmin.remove();
    res.status(200).json({ message: 'Subadmin removed' });
  } else {
    res.status(404).json({ message: 'Subadmin not found' });
  }
};

module.exports = { createSubadmin,updateSubadminProfile ,deleteSubadmin,getSubadminsList};
