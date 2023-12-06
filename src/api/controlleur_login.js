const service = require('../service/service');
const service_sauvegarde = require('../service/service_sauvegarde');
const service_login = require('../service/service_login');
const service_adresse = require('../service/service_adresse');
const auth = require ('../auth/auth');
const crypto = require('crypto-js');
const axios = require('axios'); 


exports.register = function(req,res){
    const email = req.body.email;
    let password = req.body.password;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    
    
    
    const user = service_login.register(email,password,nom,prenom,);
    res.json(user);
}


exports.login =async function(req,res){
    const email = req.body.email;
    let password = req.body.password;

    
    const user =await service_login.login(email,password);

    if(!user){
        res.status(401).send('invalid credentials');
        return;
    }

    const accessToken = auth.generateAccessToken(email);

    res.json({
        accessToken: accessToken
    });

}