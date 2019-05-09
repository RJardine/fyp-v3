const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

// initialise app variable with express
const app = express();

// initialise middleware bodyparser
app.use(express.json({ extended: false }));

// db connect
connectDB();

// SERVER ROUTES - Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const host = "0.0.0.0";
const PORT = process.env.PORT || 5000;

// port listen
app.listen(PORT, host, () => console.log(`Server started on port ${PORT}`));
