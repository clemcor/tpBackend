const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    user:{
        password: {type: String, required: true},
        email: {type: String, unique: true , required: true},
        salt: {type: String,  required: true},
        nom: {type: String, required: true},

    }


    });

const cco_user = mongoose.model('cco_user', Schema);

module.exports = cco_user;