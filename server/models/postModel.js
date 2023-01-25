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
    comments: [
        {
            text: String,
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;