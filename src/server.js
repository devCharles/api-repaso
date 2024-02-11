// definicion del servidor
const express = require("express");
const postRouter = require("./routers/post.router");
const userRouter = require("./routers/user.router");
const cors = require("cors");

// const app = express();
const server = express();
server.use(cors());
server.use(express.json());

server.use("/posts", postRouter);
server.use("/users", userRouter);

server.get("/", (request, response) => {
  response.json({
    message: "API repaso v1",
    success: true,
  });
});

module.exports = server;
