const mongoose = require('mongoose');


const cnicSchema = new mongoose.Schema({
  cnicFront: {
    type: String,
   
  },
  cnicBack: {
    type: String,
   
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const CNIC = mongoose.model('CNIC', cnicSchema);
module.exports = CNIC;