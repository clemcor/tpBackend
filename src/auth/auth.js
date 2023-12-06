const jwt = require('jsonwebtoken')

// chargement du fichier d'env



exports.generateAccessToken = (user) => {
    console.log(process.env.ACCESS_TOKEN_SECRET);
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 43200 });
};


exports.isAutenficated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(token);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}