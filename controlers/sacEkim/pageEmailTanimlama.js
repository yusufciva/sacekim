const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'smtp port user pass editUser editDate';
const nodemailer = require('nodemailer');
const sistemMail = require('../sistemMail');
const schemaSistemMail = require('../../models/sacEkim/schemaSistemMail');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        smtp: '',
        port: '',
        user: '',
        pass: '',
        editUser: '',
        editDate: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: {},
        querySchema: 'SistemMail'
    };
    queryManager.Click(json, (result) => {
        result.tableData[0]['pass'] = '*******';
        callback(result);
    });
};
const Delete = (data, actionName, callback) => {
    let _id = htmlspecialchar(data.processID);
    let json = {
        request: data,
        actionName,
        queryJSON: { _id, },
        querySchema: 'SistemMail',
        dtColLen: 6,
    };
    queryManager.Delete(json, (result) => {
        if (result.info == 2) {
            sistemMail.deleteTransportler();
        };
        callback(result);
    });
};
const Insert = (data, actionName, callback) => {
    let clientData = data.data;
    let smtp = htmlspecialchar(clientData[0]);
    let port = parseInt(htmlspecialchar(clientData[1]));
    let user = htmlspecialchar(clientData[2]);
    let pass = htmlspecialchar(clientData[3]);
    if (!port > 0) {//Sayılsal bir değer gelmediyse
        callback({ status: true, info: 'Port numarası sayısal bir alan olmalıdır!' })
    }
    else {
        let transporter = nodemailer.createTransport({
            host: smtp,
            port: port,
            secure: (port == 465 ? true : false), // true for 465, false for other ports
            auth: {
                user, // generated ethereal user
                pass // generated ethereal password
            }
        });
        transporter.verify(function (error, success) {
            if (error) {
                callback({ status: true, info: 'Girdiğiniz bilgilere ait e-mail adresine erişim sağlanmadı!' });
            } else {
                sistemMail.updateTransporter(transporter);
                let uniqueFields = {};//1 adet kayıt istendiği için
                let newData = new schemaSistemMail({
                    smtp,
                    port: transporter.options.port,
                    secure: (transporter.options.port == 465 ? true : false),
                    user,
                    pass
                });
                let returnDataFormat = ['_id', 'smtp', 'port', 'user', 'pass', 'editUser', 'editDate'];
                delete data['data'];
                let json = {
                    request: data,
                    createInfo: { status: true, editFormat: 'YYYY/MM/DD HH:mm', createFormat: 'YYYY/MM/DD HH:mm' },//True olduğu durumda ilk kayıt için her zaman düzenleyen ve oluşturan bilgisini kaydeder
                    actionName,
                    unique: { status: true, uniqueFields },
                    newData,
                    querySchema: 'SistemMail',
                    returnDataFormat
                };
                queryManager.Insert(json, (processStatus) => {
                    callback(processStatus);
                });
            };
        });
    };

};
const Update = (data, actionName, callback) => {
    let clientData = data.data;
    let smtp = htmlspecialchar(clientData[0]);
    let port = parseInt(htmlspecialchar(clientData[1]));
    let user = htmlspecialchar(clientData[2]);
    let pass = htmlspecialchar(clientData[3]);
    if (!port > 0) {//Sayılsal bir değer gelmediyse
        callback({ status: true, info: 'Port numarası sayısal bir alan olmalıdır!' })
    }
    else {
        let transporter = nodemailer.createTransport({
            host: smtp,
            port: port,
            secure: (port = 465 ? true : false), // true for 465, false for other ports
            auth: {
                user, // generated ethereal user
                pass // generated ethereal password
            }
        });
        transporter.verify(function (error, success) {
            if (error) {
                callback({ status: true, info: 'Girdiğiniz bilgilere ait e-mail adresine erişim sağlanmadı!' });
            } else {
                sistemMail.updateTransporter(transporter);
                let _id = htmlspecialchar(data.processID);
                delete data.data;
                let returnDataFormat = ['_id', 'smtp', 'port', 'user', 'pass', 'editUser', 'editDate'];
                let updateFieldValue = ['', smtp, transporter.options.port, user, pass, '', moment().format('YYYY/MM/DD HH:mm')];
                let json = {
                    request: data,
                    actionName,
                    unique: { status: false, },
                    returnDataFormat,
                    updateFieldValue,
                    queryJSON: { _id },
                    queryString,
                    querySchema: 'SistemMail',
                };
                queryManager.Update(json, (result) => {
                    callback(result);
                });
            };
        });
    };
};
module.exports = {
    Click,
    Delete,
    Insert,
    Update
};