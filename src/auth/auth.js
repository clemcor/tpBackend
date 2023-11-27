const jwt = require('jsonwebtoken')

// chargement du fichier d'env



exports.generateAccessToken = (user) => {
    console.log(process.env.ACCESS_TOKEN_SECRET);
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 600 });
};