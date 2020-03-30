const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaKullanici = new Schema({
    //Gerekli Kısımlar
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: Number, required: true },
    userTitle: { type: String, required: true },
    userlogo: { type: String },//Default kullanıcı fotoğrafı eklencek!!!
    ogrenciNo: { type: String, unique: true },
    parentProgramID: { type: mongoose.Types.ObjectId },
    firmaID: { type: mongoose.Types.ObjectId },
    firmaAdi: String,
    //Kimlik Bilgileri İçin
    fullName: String,
    passportID: { type: String, unique: true },
    fathername: String,
    mothername: String,
    birthplace: String,
    birthdate: Date,
    gender: String,

    //İsteğe Bağlı Bilgiler
    email: String,
    address: String,
    phonenumber1: String,
    phonenumber2: String,

    editUser: String,
    editDate: String,
    createUser: String,
    createDate: String,
    status: Boolean,
    
    resetPass: String
});
schemaKullanici = mongoose.model('schemaKullanici', schemaKullanici);
module.exports = schemaKullanici;