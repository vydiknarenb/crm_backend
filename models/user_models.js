const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 32,
        trim: true,
    },
    lastName: {
        type: String,
        maxlength: 32,
        trim: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 10
        
    },
    emailId: {
        type: String,
        required: true,
        unitque:true
    },
    password: {
        type: String,
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        default: "Customer",
        enum: ["Customer", "Admin", "superadmin", "Receptionist"],
        required: true
    },
    country: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    zip: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);