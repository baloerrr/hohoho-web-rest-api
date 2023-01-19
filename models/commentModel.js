const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
});

const Comment = mongoose.model("Comment", postSchema);

module.exports = Comment;