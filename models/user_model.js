const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    auth0Id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    picture: String
});

module.exports = model('User', UserSchema, 'users');