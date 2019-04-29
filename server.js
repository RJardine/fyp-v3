const express = require("express");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

// initialise app variable with express
const app = express();

// db connect
connectDB();

// port listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// SERVER ROUTES - Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

// TEST GET REQ
app.get("/", (req, res) => res.send("API RUNNING"));
