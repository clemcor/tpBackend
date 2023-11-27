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
    let password = req.body.email;

    
    const user =await service.getUser(email,password);

    if(!user){
        res.status(401).send('invalid credentials');
        return;
    }

    const accessToken = auth.generateAccessToken(email);

    res.json({
        accessToken: accessToken
    });

}