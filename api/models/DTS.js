const mongoose = require('mongoose');

const dtsSchema = new mongoose.Schema({
  formGId : { type: String },
  formIs: { type: String },
  menuCard: { type: String },
  leaseAgreement: { type: String },
  partnershipDeed: { type: String },
  incorporationCertificate: { type: String },
  memorandum: { type: String },
  FormA: { type: String},
  Form29: { type: String }
});

const DTS = mongoose.model('DTS', dtsSchema);
module.exports = DTS;