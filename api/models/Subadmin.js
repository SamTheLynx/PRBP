const mongoose = require('mongoose');
const {Schema} = mongoose;

const SubadminSchema = new Schema({
    cnic: {type: String, unique: true},
    fname: String,
    lname: String,
    phone: String,
    email: String,
    password: String,
    organisation: String
})

const SubadminModel = mongoose.model('Subadmin', SubadminSchema);

module.exports = SubadminModel;