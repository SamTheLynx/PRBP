const mongoose = require('mongoose');

const proofSchema = new mongoose.Schema({
    filePath: { type: String, required: true },
    bill: { type: String, required: true },
    formGId: { type: String }
});

const Proof = mongoose.model('Proof', proofSchema);
module.exports = Proof;