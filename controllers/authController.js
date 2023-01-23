const User = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const register = async(req,res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({username});
    
    if(existingUser) return res.status(400).json("Username Sudah Ada");

    const hashPassword = await argon2.hash(password); 
    
    const newUser = new User({
        username: username,
        password: hashPassword,
    })
    try {
        await newUser.save();
        res.status(200).json("Register Berhasil");
    } catch (error) {
        res.status(500).json(error.message || "Register Gagal")
    }
}

const login = async(req,res) => {
    const { username } = req.body;
    try {

        const existingUser = await User.findOne({username});
        if(!existingUser) return res.status(404).json("Username tidak Ditemukan");

        const verifyPassword = await argon2.verify(existingUser.password, req.body.password);

        if(!verifyPassword) return res.status(401).json("Wrong Password");

        const token = jwt.sign({
            id: existingUser._id,
            isAdmin: existingUser.isAdmin
        }, process.env.JWT_KEY, {
            expiresIn: "3d"
        });
        
        const { password, isAdmin, ...otherDetails} = existingUser._doc
        
        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json({...otherDetails});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    register, login
}