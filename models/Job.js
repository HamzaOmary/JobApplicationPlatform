const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const JobSchema = new mongoose.Schema({
    jobId: {type:Number, primary:true},
    jobTitle: { type: String, required: true },
    jobDescription:{ type: String, required: true },
    jobQualification: { type: String, required: true },
    location: String,
    jobStatuse: Boolean,
    postedDate: { type: Date, default: Date.now },

    // company id as fk
    companyId: { type: Number, ref: 'Company' }
   
});
// Auto-increment jobId
JobSchema.plugin(AutoIncrement, { inc_field: 'jobId' });

module.exports = mongoose.model('Job', JobSchema);