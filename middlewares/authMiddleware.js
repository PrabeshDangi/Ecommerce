const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "User unauthorized!! ",
        });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "Token is missing!! ",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

module.exports = {
  tokenValidator,
  isAdmin,
};
