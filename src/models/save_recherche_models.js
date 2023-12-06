const mongoose = require('mongoose');

//email,codepostal,ville,Dpe,Ges,surface_Max,surface_Min,surface_exacte,date

const Schema = new mongoose.Schema({
    email: {type: String, required: true},
    codepostal: {type: String, required: false},
    ville: {type: String, required: false},
    Dpe: {type: String, required: false},
    Ges: {type: String, required: false},
    surface_Max: {type: String, required: false},
    surface_Min: {type: String, required: false},
    surface_exacte: {type: String, required: false},
    date: {type: String, required: true},
    });


const save_recherche = mongoose.model('cco_searches', Schema);

module.exports = save_recherche;