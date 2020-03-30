const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let menuShema = new Schema({
    moduleName: String,
    menuName: { type: String, required: true, unique: true },
    userType: [],
    menuHTML: String,
});

module.exports = mongoose.model('menus', menuShema);