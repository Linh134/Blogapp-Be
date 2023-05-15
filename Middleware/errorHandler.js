const apiError = require("./apiError");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof apiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json("Something went wrong");
};

module.exports = errorHandler;
