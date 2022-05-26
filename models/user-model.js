let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    userType: {
        type: String,
        default: 'user'
    }
});
let userModel = new mongoose.model('User', schema);
module.exports = userModel;