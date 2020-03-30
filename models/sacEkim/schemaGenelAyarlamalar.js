const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaGenelAyarlamalar = new Schema({
    //Gerekli Kısımlar
    baslikKisim1: { type: String, required: true, },
    baslikKisim2: { type: String, required: true },
    telefon: { type: String, required: true },
    eposta: { type: String, required: true },
    
});
schemaGenelAyarlamalar = mongoose.model('schemaGenelAyarlamalar', schemaGenelAyarlamalar);
module.exports = schemaGenelAyarlamalar;