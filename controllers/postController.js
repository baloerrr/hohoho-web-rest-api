const Post = require("../models/postModel");
const User = require("../models/userModel");
const mongoose =  require("mongoose");
const toId = mongoose.Types.ObjectId

const createJoke = async(req,res) => {
    const { content } = req.body;
    // const { id } = req.params

    // const newId = mongoose.Schema.Types.ObjectId.fromString(id)

    // console.log(req.user);
    const newPost = await Post({
         content: content,
         author: req.user
    });
    try {
        await newPost.save();
        console.log(req.user);
        res.status(200).json( newPost);
    } catch (error) {
        console.log(error.message);
    }
}

// const getJoke = async(req,res) => {
//     try {
//         const author = toId(req.params.authorId);
//         const post = await Post.findById(req.params.postId);
//         post.author = author;
//         await post.save();
//         res.json(post)
//     } catch (error) {
//         res.json(error.message);
//     }
// }

const getJokes = async(req,res) => {
    try {
        const post = await Post.find({}).populate("author", "_id name");
        res.json(post);
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    createJoke,  getJokes
}