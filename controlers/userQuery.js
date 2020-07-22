const user = require('../models/sacEkim/schemaKullanici');
const sistemMail = require('./sistemMail');
const mongoose = require('mongoose');

const get = (uname, callback) => {
    user.findOne({ username: uname }).then((data) => {
        if (data) {
            callback(data);
        }
        else {
            callback(false);
        };
    });
};

const login = (uname, pass, callback) => {
    user.findOne({ username: uname, password: pass }).then((data) => {
        if (data) {
            callback({ status: true, userStatus: (data.status ? true : false) });// Kullanıcı adı ve şifre eşleşmesi veri tabanında bulunduysa ve kullanıcı durumu false değilse
        }
        else {
            callback({ status: false }); //Kullanıcı adı ve şifre eşleşmesi bulunamadıysa
        };
    });
};

const forgetPass = (username, callback) => {
    user.findOne({ username }).then((userData) => {
        if (userData) {
            if (userData.status) {
                let html = `
                    <h2>Saç Ekim Yönetim Sistemi - Hesap Bilgileri Hatırlatma</h2>
                    <h3>Sistem Erişim Bilgileriniz;</h3>
                    <ul style="list-style-type:none;">
                        <li>Kullanıcı Adı: `+ userData.username + `</li>
                        <li>Kullanıcı Şifresi: `+ userData.password + `</li>
                        <li>Giriş için <a href="http://localhost/>TIKLAYINIZ</a></li>
                    </ul>
            `;
                sistemMail.sendMail(userData.email, "ONLİNE SAÇ EKİM SİTESİ", html, (sendMailData) => {
                    if (!sendMailData.status) {
                        callback({ status: "Şifre hatırlatma bilgileri gönderilemedi.Lütfen yetkili ile irtibata geçerek durumu bildiriniz." })
                    }
                    else {
                        callback({ status: 1 });
                    };
                });
            }
            else {
                callback({ status: "Bu hesap aktif olmadığı için işlem gerçekleşmedi!" });
            };
        }
        else {
            callback({ status: "Böyle bir kayıt sistemde bulunamadı!" });
        };
    });
};

const maingPageData = (userType, username, callback) => {
    if (userType == 1 || userType == 2) {
        let cbObj = {};
        user.find({ status: true }, '_id').then((kullanici) => {
            cbObj['kullanici'] = kullanici.length;
        });
        callback(cbObj);
    }
};


module.exports = {
    get,
    login,
    forgetPass,
    maingPageData
};