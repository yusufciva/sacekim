const mongoose = require('mongoose');
const Schema = mongoose.Schema;

schemaSistemMail = mongoose.model('schemaSistemMail',
    new Schema({
        smtp: { required: true, type: String },
        port: { required: true, type: Number },
        secure: { required: true, type: Boolean },
        user: { required: true, type: String },
        pass: { required: true, type: String },
        createUser: String,
        createDate: String,
        editUser: String,
        editDate: String,
    })
);

module.exports = schemaSistemMail;