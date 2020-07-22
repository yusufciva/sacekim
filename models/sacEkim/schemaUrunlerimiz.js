const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaUrunlerimiz = new Schema({
    //Gerekli Kısımlar
    gorsel: String,    
    urunAdiTR: String,
    urunAdiEN: String,
    urunAdiES: String,
    urunAdiFR: String,
    urunAdiDE: String,
    urunAdiIT: String,
    urunAdiAR: String,
    urunAdiPT: String,
    urunAdiRU: String,
    yaziTR:Object,
    yaziEN:Object,
    yaziES:Object,
    yaziFR:Object,
    yaziDE:Object,
    yaziIT:Object,
    yaziAR:Object,
    yaziPT:Object,
    yaziRU:Object,
    createUser: String,
    createDate: String,
    editUser: String,
    editDate: String,

});
schemaUrunlerimiz = mongoose.model('schemaUrunlerimiz', schemaUrunlerimiz);
module.exports = schemaUrunlerimiz;