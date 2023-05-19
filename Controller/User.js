const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const apiError = require("../Middleware/apiError");

const userRegister = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next(apiError.badRequest("All field must be fill"));
    return;
  }

  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      next(apiError.unAuthorized("username has been taken"));
      return;
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username: username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ username, token, userId: newUser._id });
  } catch (error) {
    next(apiError.internalSever(`${error.message}`));
    return;
  }
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next(apiError.badRequest("All field must be fill"));
    return;
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      next(apiError.unAuthorized("Incorrect username or password"));
      return;
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      next(apiError.unAuthorized("Incorrect username or password"));
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ username, token, userId: user._id });
  } catch (error) {
    next(apiError.internalSever(`${error.message}`));
    return;
  }
};

module.exports = { userRegister, userLogin };
