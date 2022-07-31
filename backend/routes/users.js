const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        // generate password with hash(password+salt)
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        // save
        const user = await newUser.save();
        res.status(200).json(user._id) // send only id 

    } catch (error) {
        res.status(500).json(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        // find the user in Database with given usernamee
        const user = await User.findOne({ username: req.body.username });
        if(!user) return res.status(400).json("Incorrect username/password");

        // check if password is valid or not
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if(!isValid) return res.status(400).json("Incorrect username/password");

        // valid - send id and username as response
        res.status(200).json({ _id: user._id, username: user.username })

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;