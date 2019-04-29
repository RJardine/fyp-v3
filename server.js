const express = require("express");
// initialise app variable with express
const app = express();
// port
const PORT = process.env.PORT || 5000;
// port listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// GET REQ
app.get("/", (req, res) => res.send("API RUNNING"));
