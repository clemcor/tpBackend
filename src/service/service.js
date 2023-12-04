const fs = require('fs');
const bcrypt = require('bcrypt');

const mongoose = require('../models/models');
const usermongoose = require('../models/user_model');



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

exports.getAdresse = async function(codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte){
    let adresse;

    await mongoose.find({"Code_postal_(BAN)": codepostal, "Etiquette_DPE": Dpe, "Etiquette_GES": Ges , "Surface_habitable_logement"}).then((result) => {
        adresse = result;
        console.log(adresse);
    });


    if(!adresse){
        return null;
    }
    return adresse;
}
