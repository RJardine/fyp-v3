const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  //Check for token
  if (!token) {
    return res.status(401).json({ msg: "no Token!, Authorization denied" });
  }

  // token found
  try {
    // verify token decode it
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // req object and assign value to usrr
    req.user = decoded.user;
    next();
  } catch (err) {
    // token not valid
    res.status(401).json({ msg: "Token is invalid" });
  }
};
