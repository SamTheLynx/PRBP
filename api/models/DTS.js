const mongoose = require('mongoose');

const dtsSchema = new mongoose.Schema({
  formIs: { type: String },
  menuCard: { type: String },
  leaseAgreement: { type: String },
  partnershipDeed: { type: String },
  incorporationCertificate: { type: String },
  memorandum: { type: String },
  FormA: { type: String},
  Form29: { type: String }
});

module.exports = mongoose.model('DTS', dtsSchema);
