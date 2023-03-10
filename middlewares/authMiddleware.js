const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async(req,res,next) => {
    try {
        const token = req.cookies["access_token"];
        if(!token) return res.status(401).json({msg: 'You are not authenticated'});

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) return res.status(403).json({msg: 'Token is not valid', err});
            console.log(user);
            const { id } = user
            User.findById(id).then(userData => {
                req.user =userData;
                next();
            });
        });
    } catch (error) {
        res.json(error.message);
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res, () => {
        console.log(req.user._id);
        if(req.user._id ) {
            next();
        } else {
            return res.status(403).json({msg: 'You are not authorized'});
        }
    });
}

const verifyTokenAdmin = (req,res,next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin === true) {
          next();
        } else {
          res.status(403).json("You are not alowed to do that!");
        }
      });
}

module.exports = {
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAdmin
}