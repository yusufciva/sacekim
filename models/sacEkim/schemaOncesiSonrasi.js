const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaOncesiSonrasi = new Schema({
    //Gerekli Kısımlar    
    before: String,
    after: String,
});
schemaOncesiSonrasi = mongoose.model('schemaOncesiSonrasi', schemaOncesiSonrasi);
module.exports = schemaOncesiSonrasi;