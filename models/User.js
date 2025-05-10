const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    userId: {type:Number, primary:true},
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true},
    resumeUrl: String,
    userName: {type: String, required: true, unique: true},  // for later add to login model 
    password: { type: String, required: true }, // for later add to login model 
});
// Auto-increment userId
UserSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', UserSchema);