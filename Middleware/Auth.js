const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "not bearer" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).json({ message: "not valid token" });
    return;
  }
  try {
    const userDecoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = userDecoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Request is not authorized" });
  }
};

module.exports = protect;
