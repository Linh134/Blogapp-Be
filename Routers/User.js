const express = require("express");
const { userRegister, userLogin } = require("../Controller/User");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("HELLO");
});

// user register
router.post("/register", userRegister);

// user login
router.post("/login", userLogin);

module.exports = router;
