const db = require("../config/connection");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
