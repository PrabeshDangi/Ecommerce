const express = require("express");
const {
  signUp,
  login,
  test,
  forgotpassword,
} = require("../Controllers/userController");
const { tokenValidator } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/login").post(login);

//Protected Routes
router.route("/test").get(tokenValidator, test);
router.route("/forgotpassword").post(forgotpassword);
router.route("/dashboard").get(tokenValidator, (req, res) => {
  res.status(200).json({
    ok: true,
    message: "OK Done!!",
  });
});

module.exports = router;
