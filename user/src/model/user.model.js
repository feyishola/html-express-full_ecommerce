
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true , unique:true},
    userCategory:{type: String, enum:["admin","customer"],required:true},
    address: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = model('User', userSchema);