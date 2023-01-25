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
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
