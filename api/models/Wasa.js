const mongoose = require('mongoose');
const {Schema} = mongoose;

const wasaSchema = new mongoose.Schema({
    ownershipCertificate: {
      type: String, 
      
    },
    buildingPlan: {
      type: String, 
    
    },
    locationPlan: {
      type: String, 
      
    },
    commercializationCertificate: {
      type: String, 
      
    },
    authorityLetter: {
      type: String,
      
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Create the model
  const Wasa = mongoose.model('Wasa', wasaSchema);
  
  module.exports = Wasa;