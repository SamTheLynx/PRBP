const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    cnic: {type: String, unique: true},
    fname: String,
    lname: String,
    phone: String,
    email: String,
    password: String,
    
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;