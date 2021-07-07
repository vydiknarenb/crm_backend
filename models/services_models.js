const mongoose = require('mongoose');
const ServiceSchema = mongoose.Schema({
    serviceName:{
        type: String,
        maxlength: 64,
        trim: true 
    },
    serviceDescription:{
        type: String,
        maxlength: 200,
        trim: true
    },
    servicePrice:{
        type: String,
        maxlength: 10,
        trim: true
    },
    createdOn:{
        type: String,
        default: Date.now
    }
});

module.exports =  mongoose.model('Service',ServiceSchema);