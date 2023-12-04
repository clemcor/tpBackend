const service = require('../service/service');
const auth = require ('../auth/auth');
const crypto = require('crypto-js');

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
    const durface_exacte = req.body.surface_exacte;

    const adresse = await service.getAdresse(codepostal,ville,Dpe,Ges);
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