const fs = require('fs');
const bcrypt = require('bcrypt');
const axios = require('axios');

const mongoose = require('../models/models');
const mongooseid = require('mongoose');
const usermongoose = require('../models/user_model');
const savemongoose = require('../models/save_recherche_models');




exports.register = async function (email,password,nom,prenom){

    let salt2 = await bcrypt.genSalt(10);
    let password2 = await bcrypt.hash(password, salt2);


    const user = new usermongoose({

        user:{
            password: password2,
            email: email,
            salt: salt2,
            nom: nom,
            prenom: prenom
        }


    });
    //verrif si l'utilisateur existe deja dans la bdd

    let user2 = await usermongoose.findOne({"user.email": email});
    if(user2){
        console.log('user already exist');
        return null;
    }

    user.save().then(() => console.log('user saved'));


}




exports.login = async function(email, password){
    let user;
    
    await usermongoose.find({"user.email": email}).then((result) => {
        user = result[0];
        //console.log(user);
    });
    if(!user){
        return null;
    }
    let salt = user.user.salt;
    let password2 = user.user.password;
    let password3 = await bcrypt.hash(password, salt);
    console.log(password2);
    console.log(password3);
    if(password2 === password3){
        console.log('password correct');
        return user;
    }
}