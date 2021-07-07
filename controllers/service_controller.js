const express = require('express');
const router = express.Router();
const Service = require('../models/services_models');
const invoice = require('../invoice');

//Create New Service

router.post('/register', async (req, res) => {
const service = new Service({
    serviceName : req.body.serviceName,
    serviceDescription : req.body.serviceDescription,
    servicePrice : req.body.servicePrice,
    createdOn : req.body.createdOn
});
try{
   
    const savedService = await service.save();
    res.json({message: "saved succesfully"});
}catch (err) {
    res.json({
        message:err
    });
}
});
 
router.get('/generateInvoice', async (req, res)=>
{
    try{
        await  invoice.createInvoice();
        res.json("Invoice generated");
    }
    catch (err){
        res.josn({
            message: err
        });
    }
});

//Get Service

router.get('/', async (req, res) => {
    try {
        const service = await Service.find();
        res.json(service);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


//Get Specific Service
router.get('/:serviceId', async (req, res) => {
    try {
        const service = await Service.findById(req.params.userId);
        res.json(service);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


//Delete Specific Service
router.delete('/:serviceId', async (req, res) => {
    try {
        const removedService = await Service.remove({
            _id: req.params.userId
        });
        res.json(removedService);
    } catch (err) {
        res.json({
            message: err
        });

    }
});


//Update or Edit Specific User
router.patch('/:serviceId', async (req, res) => {
    try {
        const updatedService = await Service.updateOne({
            _id: req.params.userId
        }, {
            $set: {
                serviceName: req.body.serviceName
            }
        });
        res.json(updatedService);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;
