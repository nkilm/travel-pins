const router = require("express").Router();
const Pin = require("../models/Pin");

// Creating a new pin 
router.post("/",async (req,res)=>{
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (error) {
        res.status(500).json(error);
    }
})

// fetching all pins 
router.get("/",async (req,res)=>{
    try {
        const allPins = await Pin.find();
        res.status(200).json(allPins);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;