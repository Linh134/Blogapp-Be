const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const userRegister = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      throw Error("This name has been taken");
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username: username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw Error("Incorrect username or password");
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      throw Error("Incorrect username or password");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { userRegister, userLogin };
