const {register,login} = require("../controllers/authController");
const express = require("express");
const { verifyToken, verifyTokenAdmin, verifyTokenAndAuthorization } = require("../middlewares/authMiddleware");
const User =require("../models/userModel");
const { createJoke, getJokes } = require("../controllers/postController");

const routes = express.Router();

routes.post("/auth/register", register);
routes.post("/auth/login", login);
routes.post("/post", verifyTokenAndAuthorization, createJoke)
// routes.get("/post/:postId/:authorId" , verifyToken, getJoke);
routes.get("/post/see" , verifyTokenAdmin, getJokes);

module.exports = routes;