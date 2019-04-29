const express = require("express");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

// initialise app variable with express
const app = express();

// db connect
connectDB();

// port listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// TEST GET REQ
app.get("/", (req, res) => res.send("API RUNNING"));
