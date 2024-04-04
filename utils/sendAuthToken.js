const genAuthToken = require("./generateAuthToken");
const User = require("../models/userModel");

const sendtoken = async (userAvailable, statuscode, res) => {
  const token = genAuthToken(userAvailable);
  // console.log(token);
  // console.log(userAvailable.email);
  // console.log(userAvailable);

  const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  const loggedInUser = await User.findById(userAvailable._id).select(
    "-password"
  );
  res.status(statuscode).cookie("token", token, cookieOptions).json({
    success: true,
    user: loggedInUser,
    token,
  });
};

module.exports = sendtoken;
