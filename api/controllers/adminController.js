// controllers/authController.js
const Staff = require('../models/Staff');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30m' });
};

// Admin Signup
const adminSignup = async (req, res) => {
  const { cnic, fname, lname, email, password, phone } = req.body;

  // Check if the user already exists
  const adminExists = await Staff.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }
  // Create new admin with default admin roles
  const admin = await Staff.create({
    fname,
    lname,
    email,
    password,
    cnic,
    phone,
    designation: 'admin',
    roles: ['create', 'update', 'delete'],
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      fname: admin.fname,
      lname: admin.lname,
      email: admin.email,
      designation: admin.designation,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Find admin by email
  const admin = await Staff.findOne({ email, designation: 'admin' });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      fname: admin.fname,
      lname: admin.lname,
      email: admin.email,
      designation: admin.designation,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Update Admin Profile
const updateAdminProfile = async (req, res) => {
  const adminId = req.user.id; // Get the authenticated admin's ID from the token
  const { fname, lname, email, cnic, phone, password } = req.body;
  const admin = await Staff.findById(adminId);

  if (admin && admin.designation === 'admin') {
    admin.fname = fname || admin.fname;
    admin.lname = lname || admin.lname;
    admin.email = email || admin.email;
    admin.cnic = cnic || admin.cnic;
    admin.phone = phone || admin.phone;
    // Hash and update password if provided
    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    // Save the updated admin profile
    const updatedAdmin = await admin.save();

    res.status(200).json({
      _id: updatedAdmin._id,
      fname: updatedAdmin.fname,
      lname: updatedAdmin.lname,
      email: updatedAdmin.email,
      cnic: updatedAdmin.cnic,
      phone: updatedAdmin.phone,
      designation: updatedAdmin.designation, // Ensure designation stays "admin"
    });
  } else {
    res.status(404).json({ message: 'Admin not found' });
  }
};

module.exports = { adminSignup, adminLogin,updateAdminProfile };
