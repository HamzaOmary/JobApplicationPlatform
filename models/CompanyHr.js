const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);



const companyHrSchema = new mongoose.Schema({
    companyHrId: {type:Number, primary:true, AutoIncrement},
    
    // user id how is HR for company as fk
    userId: { type: Number, ref: 'User' },

    // company id as fk
    companyId: { type: Number, ref: 'Company' }
});

// Apply auto-increment companyHrId
companyHrSchema.plugin(AutoIncrement, { inc_field: 'companyHrId' });

module.exports = mongoose.model('CompanyHr', companyHrSchema);