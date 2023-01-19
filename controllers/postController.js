const Post = require("../models/postModel");
const User = require("../models/userModel");

const createJokes = async(req,res) => {
    const { content, username,password } = req.body;

    const user = await User.findOne({
        username: username,
        password: password
    });

    const newPost = await Post({
        author: user._id,
         content
    });
    try {
        await newPost.save();
        res.status(200).json("Berhasil");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = createJokes;