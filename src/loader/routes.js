const controlleur = require('../api/controlleur');
const controlleur_adresse = require('../api/controlleur_adresse');
const controlleur_sauvegarde = require('../api/controlleur_sauvegarde');
const controlleur_login = require('../api/controlleur_login');
const { Router } = require('express');
const { isAutenficated } = require('../auth/auth');

module.exports = function getRouter(){
    const router = Router();
    router.post('/api/v1/ouquc/login',controlleur_login.login)
    router.post('/api/v1/ouquc/register',controlleur_login.register)
    router.get('/api/v1/ouquc/adresse',isAutenficated,controlleur.getAdresse)
    router.get('/api/v1/ouquc/longlat',isAutenficated,controlleur.getLongLat)
    router.get('/api/v1/ouquc/listRecherche',isAutenficated,controlleur.listRecherche)
    router.get('/api/v1/ouquc/deleteRecherche',isAutenficated,controlleur.deleteRecherche)
    router.get('/api/v1/ouquc/relancerRecherche',isAutenficated,controlleur.relancerRecherche)



    return router;
}