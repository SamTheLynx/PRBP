const mongoose = require('mongoose');

const wasaSchema = new mongoose.Schema({
  formGId : { type: String },
  ownershipCertificate: { type: String},
  buildingPlan: { type: String  },
  locationPlan: { type: String },
  authorityLetter: { type: String },
  application: { type: String},
  drawings: { type: String },
  parkingAgreement: { type: String },
  affidavit: { type: String },
  ekhidmatSlip: { type: String}
});

module.exports = mongoose.model('Wasa', wasaSchema);