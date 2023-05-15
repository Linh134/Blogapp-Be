require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routers/User");
const postRouter = require("./Routers/Post");
const cors = require("cors");
const errorHandler = require("./Middleware/errorHandler");
const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to MongoDB & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use(errorHandler);
