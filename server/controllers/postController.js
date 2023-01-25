const Post = require("../models/postModel");
const mongoose =  require("mongoose");

const createJoke = async(req,res) => {
    const { content } = req.body;

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

const getJokes = async(req,res) => {
    try {
        const post = await Post.find({}).populate("author", "_id name");
        res.json(post);
    } catch (error) {
        res.json(error.message);
    }
}

const createLike = async(req,res) => {
    try {
       await Post.findByIdAndUpdate(req.body.postId, {
            $push: {
                likes: req.user._id
            }}, {
                new: true
            }).populate("author", "_id name").exec((err, result) => {
                if(err) return res.status(422).json(err.message);

                res.status(200).json(result);
            })
    } catch (error) {
        res.json(error.message);
    }
}

const createUnlike = async(req,res) => {
    try {
       Post.findByIdAndUpdate(req.body.postId, {
            $pull: {likes: req.user._id}
            }, {
                new: true
            }).populate("author", "_id name").exec((err, result) => {
                if(err) return res.status(422).json(err.message);
                res.status(200).json(result);
            })
    } catch (error) {
        res.json(error.message);
    }
}

const createComment = async(req,res) => {
    try {        
        const comment = {
            comment: req.body.text,
            author: req.user._id
        }
    
        await Post.findByIdAndUpdate(req.body.postId, {
            $push: {comments: comment}
        },{
            new: true
        }).populate("comments.author", "_id name")
        .populate("author", "_id name")
        .exec((err, result) => {
            if(err) return res.status(422).json(err.message);
            res.status(200).json(result);
        });
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    createJoke,  getJokes, createLike, createUnlike, createComment
}