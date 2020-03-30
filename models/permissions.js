const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let permissionsSchema = new Schema({
    actionName: { type: String, unique: true, required: true },
    userType: { type: Array, required: true },
});
permissions = mongoose.model('permissions', permissionsSchema);
module.exports = permissions;