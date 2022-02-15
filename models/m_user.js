const mongoose = require('mongoose');
const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please fill the username"],
        minlength: [3, "Character minimum length is 3"],
        maxlength: [100, "Character maximum length is 100"]
    },
    email: {
        type: String,
        required: [true, "Please fill the email"],
        minlength: [3, "Character minimum length is 3"],
        maxlength: [100, "Character maximum length is 100"]
    },
    password: {
        type: String,
        required: [true, "Password tidak boleh kosong"],
        minlength: [3, "Character minimum length is 3"]
    }
})

module.exports = model('User', userSchema);