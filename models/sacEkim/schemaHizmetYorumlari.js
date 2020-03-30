const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaHizmetYorumlari = new Schema({
    //Gerekli Kısımlar    
    gorsel: String,
    hastaAdi: String,
    hastaYorumTR: String,
    hastaYorumEN: String,
    hastaYorumES: String,
    hastaYorumDE: String,
    hastaYorumIT: String,
    hastaYorumAR: String,
    hastaYorumPT: String,
    hastaYorumRU: String,

});
schemaHizmetYorumlari = mongoose.model('schemaHizmetYorumlari', schemaHizmetYorumlari);
module.exports = schemaHizmetYorumlari;