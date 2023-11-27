const controlleur = require('../api/controlleur');
const { Router } = require('express');

module.exports = function getRouter(){
    const router = Router();
    router.post('/api/v1/ouquc/login',controlleur.login)
    router.post('/api/v1/ouquc/register',controlleur.register)



    return router;
}