const jwt = require("jsonwebtoken");
const apiError = require("./apiError");

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    next(apiError.unAuthorized("dont have token"));
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    next(apiError.unAuthorized("not valid token"));
    return;
  }
  try {
    const userDecoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = userDecoded;
    next();
  } catch (error) {
    next(apiError.internalSever(`${error.message}`));
    return;
  }
};

module.exports = protect;
