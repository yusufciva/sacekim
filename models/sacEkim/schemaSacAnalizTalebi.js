const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaSacAnalizTalebi = new Schema({
    //Gerekli Kısımlar
    ad: String,
    gender: String,
    tip: String,
    yas: String,
    ilac: String,
    kronik: String,
    ulke: String,
    telefon: String,
    eposta: String,
    status: String,

});
schemaSacAnalizTalebi = mongoose.model('schemaSacAnalizTalebi', schemaSacAnalizTalebi);
module.exports = schemaSacAnalizTalebi;