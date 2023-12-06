const fs = require('fs');
const bcrypt = require('bcrypt');
const axios = require('axios');

const mongoose = require('../models/models');
const mongooseid = require('mongoose');
const usermongoose = require('../models/user_model');
const savemongoose = require('../models/save_recherche_models');


exports.saveRequette = async function(email,codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte){
    date = new Date();

    const save_recherche = new savemongoose({

        email: email,
        codepostal: codepostal,
        ville: ville,
        Dpe: Dpe,
        Ges: Ges,
        surface_Max: surface_Max,
        surface_Min: surface_Min,
        surface_exacte: surface_exacte,
        date: date

    });
    console.log(email);


    save_recherche.save().then(() => console.log('requette enregistré'));
}

exports.listRecherche = async function(email){
    let requette;
    await savemongoose.find({"email": email}).then((result) => {
        requette = result;
        //console.log(adresse);
    });
    if(!requette){
        return null;
    }
    return requette;
}

exports.deleteRecherche = async function(email,id){
    let requette;
    await savemongoose.deleteOne({"email": email, "_id": id}).then((result) => {
        requette = result;
        //console.log(adresse);
    });
    if(!requette){
        return null;
    }
    return requette;
}

exports.relancerRecherche = async function(email,id){
    let requette;

  

    await savemongoose.findById(id).then((result) => {
        requette = result;
        //console.log(adresse);
    });
    if(!requette){
        return null;
    }
    return requette;
}