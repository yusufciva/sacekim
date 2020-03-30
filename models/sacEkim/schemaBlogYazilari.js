const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaBlogYazilari = new Schema({
    //Gerekli Kısımlar
    gorsel: String,    
    baslikTR: String,
    baslikEN: String,
    baslikES: String,
    baslikFR: String,
    baslikDE: String,
    baslikIT: String,
    baslikAR: String,
    baslikPT: String,
    baslikRU: String,
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
schemaBlogYazilari = mongoose.model('schemaBlogYazilari', schemaBlogYazilari);
module.exports = schemaBlogYazilari;