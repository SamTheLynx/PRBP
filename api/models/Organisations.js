const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrganisationsSchema = new Schema({
    organisationId: Number,
    organisationName: String
})

const OrganisationsModel = mongoose.model('Organisations', OrganisationsSchema);

module.exports = OrganisationsModel;