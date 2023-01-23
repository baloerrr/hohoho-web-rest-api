const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    like: Number
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;