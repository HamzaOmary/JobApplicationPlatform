const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ApplicationSchema = new mongoose.Schema({
    appId: {type:Number, primary:true},
    note: String,
    status: { type: String, default: 'pending' },//  ['pending', 'reviewed', 'interview', 'rejected', 'accepted']
    appliedDate: { type: Date, default: Date.now },

    // user id and job id as fk 
    userId: { type: Number, ref: 'User' },
    jobId: { type: Number, ref: 'Job' }
});
// Auto-increment appId
ApplicationSchema.plugin(AutoIncrement, { inc_field: 'appId' });

module.exports = mongoose.model('Application', ApplicationSchema); 