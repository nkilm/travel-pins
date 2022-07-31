
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const pinRoute = require("./routes/pins");

const PORT = 9090;
const URL = process.env.MONGODB_URL;

const app = express();

// DB Connection
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB Connected...`))
    .catch((err) => console.log(err))

// Middleware
app.use(express.json()); // for POST requests

// Methods
app.use("/api/pins/",pinRoute); // http://localhost:9090/api/pins

app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})