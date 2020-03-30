const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let shemaMS = new Schema({
    moduleName: String,
});

moduleSettings = mongoose.model('moduleSettings', shemaMS);
module.exports = moduleSettings;