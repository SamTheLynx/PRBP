const mongoose = require('mongoose');


const commercializationSchema = new mongoose.Schema({
  certificatePath: {
    type: String,
   
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  }
});

// Middleware to update the updatedAt timestamp before saving
commercializationSchema.pre('save', function(next) {
  this.updatedAt = Date.now(); 
  next(); 
});

const Commercialization = mongoose.model('Commercialization', commercializationSchema);
module.exports = Commercialization;
