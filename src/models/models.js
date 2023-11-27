/*
{
  "_id":{"$oid":"656082c21941e30e2d6d035c"},
  "N°_département_(BAN)": 72,
  "Date_réception_DPE":"2023-04-20",
  "Date_établissement_DPE":"2023-04-20",
  "Date_visite_diagnostiqueur":"2023-04-11",
  "Etiquette_GES":"A",
  "Etiquette_DPE":"A",
  "Année_construction": 1945,
  "Surface_habitable_logement": 192.7,
  "Adresse_(BAN)":"Lieu Dit la Grande Corbiniere 72300 Souvigné-sur-Sarthe",
  "Code_postal_(BAN)": 72300
}
*/

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    "N_département_BAN(BAN)": Number,
    "Date_réception_DPE": String,
    "Date_établissement_DPE": String,
    "Date_visite_diagnostiqueur": String,
    "Etiquette_GES": String,
    "Etiquette_DPE": String,
    "Année_construction": Number,
    "Surface_habitable_logement": Number,
    "Adresse_(BAN)": String,
    "Code_postal_(BAN)": Number


    });

const depmini72 = mongoose.model('depmini72', Schema);

module.exports = depmini72;
