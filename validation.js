//VALIDATION
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().max(32).required(),
        lastName: Joi.string().max(32).required(),
        emailId: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
        mobileNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        role: Joi.string().required(),
        country:Joi.string().required(),
        address:Joi.string().required(),
        city:Joi.string().required(),
        state:Joi.string().required(),
        zip:Joi.string().required()
    
    });
    return schema.validate(data);
};

//Login Validation
const loginValidation = data => {
    const schema = Joi.object({
        emailId: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;