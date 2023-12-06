const fs = require('fs');
const bcrypt = require('bcrypt');
const axios = require('axios');

const mongoose = require('../models/models');
const mongooseid = require('mongoose');
const usermongoose = require('../models/user_model');
const savemongoose = require('../models/save_recherche_models');



exports.getAdresse = async function(codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte){
    let adresse;
    if(surface_exacte){
        await mongoose.find({"Code_postal_(BAN)": codepostal, "Etiquette_DPE": Dpe, "Etiquette_GES": Ges , "Surface_habitable_logement":{"$gte":surface_exacte , "$lte" : surface_exacte+1} }).then((result) => {
            adresse = result;
            //console.log(adresse);
        });
    }
    else if(surface_Max && surface_Min){
    
    await mongoose.find({"Code_postal_(BAN)": codepostal, "Etiquette_DPE": Dpe, "Etiquette_GES": Ges , "Surface_habitable_logement":{"$gte":surface_Min , "$lte" : surface_Max} }).then((result) => {
        adresse = result;
        //console.log(adresse);
        });
    }
    else {
        await mongoose.find({"Code_postal_(BAN)": codepostal, "Etiquette_DPE": Dpe, "Etiquette_GES": Ges }).then((result) => {
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
    //console.log(adresse)
    //console.log(adresse["Adresse_(BAN)"])

    let adresse2 = adresse.replace(/ /g, "%20");
    //remplasse les ' par des %27
    adresse2 = adresse2.replace(/'/g, "%27");
    //console.log(adresse2);
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
    let tabResultat = [];
    if(found){
        let test2 =await axios.get('https://nominatim.openstreetmap.org/search?q='+adresse2+'%20France&format=json&addressdetails=1&limit=1&polygon_svg=1').then((response) => {
    
        
        tabResultat.push(response.data[0].lat);
        tabResultat.push(response.data[0].lon);
        
       
    });
    }
    else{
        return null;
    }
    return tabResultat;

}