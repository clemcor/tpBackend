const service = require('../service/service');
const auth = require ('../auth/auth');
const crypto = require('crypto-js');
const axios = require('axios'); 
//const axios = require('axios/dist/node/axios.cjs'); // node


exports.register = function(req,res){
    const email = req.body.email;
    let password = req.body.password;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    
    
    
    const user = service.register(email,password,nom,prenom,);
    res.json(user);
}


exports.login =async function(req,res){
    const email = req.body.email;
    let password = req.body.password;

    
    const user =await service.login(email,password);

    if(!user){
        res.status(401).send('invalid credentials');
        return;
    }

    const accessToken = auth.generateAccessToken(email);

    res.json({
        accessToken: accessToken
    });

}

exports.getAdresse = async function(req,res){
    const codepostal = req.body.codepostal;
    const ville = req.body.ville;
    const Dpe = req.body.Dpe;
    const Ges = req.body.Ges;
    const surface_Max = req.body.surface_Max;
    const surface_Min = req.body.surface_Min;
    const surface_exacte = req.body.surface_exacte;

    const adresse = await service.getAdresse(codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte);


   
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
    const adresse = await service.getAdresse(codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte);
    console.log(adresse);
    let longitudeLatitude = [];
    //appeler la fonction getLongLat pour toutes les adresses
    for (let i = 0; i < adresse.length; i++) {
        let longlat = await service.getLongLat(adresse[i]["Adresse_(BAN)"]);
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
        exports.saveRequette(req,res);
    }

    
    console.log(response);

    res.json(response);
}

exports.saveRequette = async function(req,res){
    
    
    const email =  req.user.user;
    const codepostal = req.body.codepostal;
    const ville = req.body.ville;
    const Dpe = req.body.Dpe;
    const Ges = req.body.Ges;
    const surface_Max = req.body.surface_Max;
    const surface_Min = req.body.surface_Min;
    const surface_exacte = req.body.surface_exacte;
    const date = new Date();
    const requette = await service.saveRequette(email,codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte,date);
    res.json(requette);
    



}
exports.listRecherche = async function(req,res){
    const email =  req.user.user;
    const requette = await service.listRecherche(email);
    res.json(requette);

}

exports.deleteRecherche = async function(req,res){
    const email =  req.user.user;
    const id = req.body.id;
    const requette = await service.deleteRecherche(email,id);
    res.json(requette);

}

exports.relancerRecherche = async function(req,res){
    const email =  req.user.user;
    const id = req.body.id;
    const requette = await service.relancerRecherche(email,id); 


    const codepostal = requette["codepostal"];
    const ville = requette["ville"];
    const Dpe = requette["Dpe"];
    const Ges = requette["Ges"];
    const surface_Max = requette["surface_Max"];
    const surface_Min = requette["surface_Min"];
    const surface_exacte = requette["surface_exacte"];
    const date = new Date();
    const adresse = await service.getAdresse(codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte);
    let longitudeLatitude = [];
    let texterror = [];
    let error = false;
    let y = 0;
    let response = [];
    //appeler la fonction getLongLat pour toutes les adresses
    for (let i = 0; i < adresse.length; i++) {
        let longlat = await service.getLongLat(adresse[i]["Adresse_(BAN)"]);
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
    console.log(response);
    res.json(response);

}
