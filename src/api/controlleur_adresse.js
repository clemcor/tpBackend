const service = require('../service/service');
const service_sauvegarde = require('../service/service_sauvegarde');
const service_login = require('../service/service_login');
const service_adresse = require('../service/service_adresse');

const auth = require ('../auth/auth');
const crypto = require('crypto-js');
const axios = require('axios'); 


exports.getAdresse = async function(req,res){
    const codepostal = req.body.codepostal;
    const ville = req.body.ville;
    const Dpe = req.body.Dpe;
    const Ges = req.body.Ges;
    const surface_Max = req.body.surface_Max;
    const surface_Min = req.body.surface_Min;
    const surface_exacte = req.body.surface_exacte;


    const adresse = await service_adresse.getAdresse(codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte);


   
    res.json(adresse);

}
//requette
/*
{
    "codepostal": "72300",
    "Dpe": "A",
    "Ges": "A"
}
*/
exports.getLongLat = async function(req,res){
    const codepostal = req.body.codepostal;
    const ville = req.body.ville;
    const Dpe = req.body.Dpe;
    const Ges = req.body.Ges;
    const surface_Max = req.body.surface_Max;
    const surface_Min = req.body.surface_Min;
    const surface_exacte = req.body.surface_exacte;
    let texterror = [];
    let error = false;
    let y = 0;
    let response = [];
    const adresse = await service_adresse.getAdresse(codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte);
    console.log(adresse);
    let longitudeLatitude = [];
    //appeler la fonction getLongLat pour toutes les adresses
    for (let i = 0; i < adresse.length; i++) {
        let longlat = await service_adresse.getLongLat(adresse[i]["Adresse_(BAN)"]);
        if (longlat == null){
            texterror[y] = "La base de donnée ne contient pas les informations demandées pour l adresse " + adresse[i]["Adresse_(BAN)"] ;
            y++;
            error = true;
        }
        if (error == true){
            response[i] ={
           
            "Error": texterror[y-1]
       }
            error = false;
            
        }
        else{
            response[i] ={
            "Adresse": adresse[i]["Adresse_(BAN)"],
            "Longitude": longlat[0],
            "Latitude": longlat[1]
         }
        }
       
        //longitudeLatitude[i]["Longitude"] = longlat[0];
        //longitudeLatitude[i]["Latitude"] = longlat[1];
        //console.log(longlat);
    } 

    //console.log(longitudeLatitude);

    // met longlat en string

    if (response){
       // exports.saveRequette(req,res);
        service_sauvegarde.saveRequette(req,res);
    }

    
    console.log(response);

    res.json(response);
}