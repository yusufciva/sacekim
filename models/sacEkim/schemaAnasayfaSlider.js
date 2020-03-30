const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaAnasayfaSlider = new Schema({
    //Gerekli Kısımlar
    baslikKisim1TR: String,
    baslikKisim2TR: String,
    baslikKisim3TR: String,
    baslikKisim1EN: String,
    baslikKisim2EN: String,
    baslikKisim3EN: String,
    baslikKisim1ES: String,
    baslikKisim2ES: String,
    baslikKisim3ES: String,
    baslikKisim1FR: String,
    baslikKisim2FR: String,
    baslikKisim3FR: String,
    baslikKisim1DE: String,
    baslikKisim2DE: String,
    baslikKisim3DE: String,
    baslikKisim1IT: String,
    baslikKisim2IT: String,
    baslikKisim3IT: String,
    baslikKisim1AR: String,
    baslikKisim2AR: String,
    baslikKisim3AR: String,
    baslikKisim1PT: String,
    baslikKisim2PT: String,
    baslikKisim3PT: String,
    baslikKisim1RU: String,
    baslikKisim2RU: String,
    baslikKisim3RU: String,
    gorsel: String,

});
schemaAnasayfaSlider = mongoose.model('schemaAnasayfaSlider', schemaAnasayfaSlider);
module.exports = schemaAnasayfaSlider;