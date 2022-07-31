const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            max: 50
        },
        password: {
            type: String,
            require: true,
            min: 6
        }

    },
    { timestamps: true }
);

// exporting schema 
module.exports = mongoose.model("User",userSchema);