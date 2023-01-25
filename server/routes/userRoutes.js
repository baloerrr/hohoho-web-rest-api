const {register,login} = require("../controllers/authController");
const express = require("express");
const { verifyTokenAdmin, verifyTokenAndAuthorization } = require("../middlewares/authMiddleware");
const User =require("../models/userModel");
const { createJoke, getJokes, createLike, createUnlike, createComment } = require("../controllers/postController");

const routes = express.Router();

routes.post("/auth/register", register);
routes.post("/auth/login", login);
routes.post("/post", verifyTokenAndAuthorization, createJoke);
routes.get("/post/see" , verifyTokenAdmin, getJokes);
routes.put("/like", verifyTokenAndAuthorization, createLike);
routes.put("/unlike", verifyTokenAndAuthorization, createUnlike);
routes.put("/comment",verifyTokenAndAuthorization, createComment);

module.exports = routes;