const mongoose = require("mongoose");

const pinSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            require: true,
            min: 3
        },
        description: {
            type: String,
            require: true,
            min: 3
        },
        latitude: {
            type: Number,
            require: true,
        },
        longitude: {
            type: Number,
            require: true,
        }
    },
    { timestamps: true }
);

// exporting schema 
module.exports = mongoose.model("Pin", pinSchema);