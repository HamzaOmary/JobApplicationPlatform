const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CompanySchema = new mongoose.Schema({
    companyId: {type:Number, primary:true},
    companyName: { type: String, required: true, unique: true },
    about: { type: String, required: true },
    location:  { type: String, required: true },
    hrEmail:  { type: String, required: true },
    websiteURL: String,
    jobsAvailable: [String], // Array of jobIds available by company

});
// Auto-increment companyId
CompanySchema.plugin(AutoIncrement, { inc_field: 'companyId' });

module.exports = mongoose.model('Company', CompanySchema);