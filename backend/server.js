
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

const PORT = process.env.PORT || 9090;
const URL = process.env.MONGODB_URL;

const app = express();

// Database Connection
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB Connected...`))
    .catch((err) => console.log(err))

// Middleware
app.use(express.json()); // for POST requests

// Methods
app.use("/api/pins/", pinRoute); // http://localhost:9090/api/pins
app.use("/api/users/", userRoute);

app.get("/", (req, res) => {
    res.json({"status":"Backend server started..."});
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})