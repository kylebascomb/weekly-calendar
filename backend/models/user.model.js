const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    firstname:{
        type: String,
        required: false,
        trim: true
    },
    lastname:{
        type: String,
        required: false,
        trim: true
    },
    password: {
        type:String,
        required: true,
        minlength: 6,
        trim: true
    }
    
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;