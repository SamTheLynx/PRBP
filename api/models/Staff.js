// models/Staff.js
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const StaffSchema = new mongoose.Schema({
  cnic: { type: String, required: true ,unique:true},
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  designation: { type: String, enum: ['admin', 'subadmin', 'businessOwner'] },
  organisation: { type: Number },// only for submins
  roles: [{ type: String }], // e.g., ['create', 'update', 'delete', 'accept', 'reject']
});

// StaffSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Password verification method
// StaffSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const Staff = mongoose.model('Staff', StaffSchema);

module.exports = Staff;
