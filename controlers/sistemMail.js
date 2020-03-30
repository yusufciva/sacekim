const nodemailer = require('nodemailer');
const schemaMail = require('../models/sacEkim/schemaSistemMail');

let transporter;


const startServer = (callback) => {
    schemaMail.findOne({}).then((mailData) => {
        if (mailData) {
            transporter = nodemailer.createTransport({
                host: mailData.smtp,
                port: mailData.port,
                secure: mailData.secure, // true for 465, false for other ports
                auth: {
                    user: mailData.user, // generated ethereal user
                    pass: mailData.pass // generated ethereal password
                }
            });
            transporter.verify(function (error, success) {
                if (error) {
                    console.log('Sistem için tanımlanan e-mail adresine giriş sağlanmadı!!!');
                }
                else {
                    console.log('Sistem için tanımlanan e-mail adresine başarıyla giriş yapıldı.');
                };
            });
        }
        else {
            console.log('Sistem için eposta adresi tanımlanmamış!');
            console.log('Lütfen arayüzden eposta tanımlaması yapınız!');
        };
    });
};
const updateTransporter = (data) => {
    transporter = data;
};
const deleteTransportler = () => {
    transporter = '';
    transporter = undefined;
};
const sendMail = (to, subject, html, callback) => {
    if (typeof transporter == undefined || !transporter) {
        callback({ status: false });//Mail tanımlanmamışsa
    }
    else {
        const mailOptions = {
            // Ben domain'imi yandex'e bağladığım için cagatay.me olarak belirttim.
            from: `Online Staj Takip Sistemi <` + transporter.options.auth.user + `>`,
            to,//Kime
            subject,//Konu
            html//İçerik html
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                callback({ status: false });
            }
            else {
                callback({ status: true });
            };
        })
    };
};
module.exports = {
    startServer,
    updateTransporter,
    deleteTransportler,
    sendMail
};

