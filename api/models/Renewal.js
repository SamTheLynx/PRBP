const mongoose = require('mongoose');
const {Schema} = mongoose;

const Renewal = new Schema({
    certificationNumber: {type: String, unique: true}
    
})

const RenewalRequest = mongoose.model('RenewalRequest', Renewal);

module.exports = RenewalRequest;




