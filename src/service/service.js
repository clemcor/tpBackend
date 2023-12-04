const fs = require('fs');
const bcrypt = require('bcrypt');
const axios = require('axios');

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
    if(surface_exacte){
        await mongoose.find({"Code_postal_(BAN)": codepostal, "Etiquette_DPE": Dpe, "Etiquette_GES": Ges , "Surface_habitable_logement":{"$gte":surface_exacte , "$lte" : surface_exacte+1} }).then((result) => {
            adresse = result;
            //console.log(adresse);
        });
    }
    else{
    await mongoose.find({"Code_postal_(BAN)": codepostal, "Etiquette_DPE": Dpe, "Etiquette_GES": Ges , "Surface_habitable_logement":{"$gte":surface_Min , "$lte" : surface_Max} }).then((result) => {
        adresse = result;
        //console.log(adresse);
        });

    }



    if(!adresse){
        return null;
    }
    return adresse;
}

exports.getLongLat = async function(adresse){
    console.log(adresse)
    console.log(adresse[0]["Adresse_(BAN)"])

    let adresse2 = adresse[0]["Adresse_(BAN)"].replace(/ /g, "%20");
    //remplasse les ' par des %27
    adresse2 = adresse2.replace(/'/g, "%27");
    console.log(adresse2);
    let response
    let found = true
    let test2 =await axios.get('https://nominatim.openstreetmap.org/search?q='+adresse2+'%20France&format=json&addressdetails=1&limit=1&polygon_svg=1').then((response) => {
    
    
    try {
        console.log(response.data[0].lat);
    } catch (error) {
        console.log('error');
        found = false
    }


    //console.log(response.data[0].lat);
      //console.log(response.data[0].lon);
    });
    
    if(found){
        let test2 =await axios.get('https://nominatim.openstreetmap.org/search?q='+adresse2+'%20France&format=json&addressdetails=1&limit=1&polygon_svg=1').then((response) => {
    


       
        return [response.data[0].lat,response.data[0].lon];
    });
    }
    else{
        return null;
    }
    

}