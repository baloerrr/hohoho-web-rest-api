const {register,login} = require("../controllers/authController");
const express = require("express");
const { verifyTokenAndAuthorization, verifyToken, verifyTokenAdmin } = require("../middlewares/authMiddleware");
const User =require("../models/userModel");
const createJokes = require("../controllers/postController");

const routes = express.Router();

routes.post("/auth/register", register);
routes.post("/auth/login", login);
routes.post("/post" , verifyToken,createJokes);

module.exports = routes;