
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 9090;
const URL = process.env.MONGODB_URL;

// DB Connection
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB Connected...`))
    .catch((err) => console.log(err))

const app = express();

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})