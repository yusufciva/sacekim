const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'username password editUser editDate';
const permission = require('../permissions');
const mongoose = require('mongoose');
const schemaKullanici = require('../../models/sacEkim/schemaKullanici');

const Click = (data, actionName, callback) => {
    permission.ctrlJwtAndPerm(htmlspecialchar(data.ucid), actionName, (permData) => {
        if (permData.status) {
            let json = {
                request: data,
                actionName,
                queryString,
                queryJSON: { username: permData.uname },
                querySchema: 'Kullanici'
            };
            queryManager.Click(json, (result) => {
                result['tableData'][0]['password'] = '********';
                result['resultData'][0]['password'] = '********';
                callback(result);
            });
        }
        else {

        };
    });
};
const Update = (data, actionName, callback) => {
    let _id = mongoose.Types.ObjectId(htmlspecialchar(data.processID));
    let clientData = data.data;
    for (let i = 0; i < clientData.length; i++) {
        clientData[i] = htmlspecialchar(clientData[i]);
    };
    if (clientData[1] == clientData[2]) {
        if (clientData[0] != clientData[1]) {
            if (clientData[1].length >= 8) {
                schemaKullanici.findOne({ _id }).then((userData) => {
                    if (userData) {
                        if (userData.password == clientData[0]) {
                            let returnDataFormat = ['_id', 'username', 'password', 'editUser', 'editDate'];
                            let updateFieldValue = ['', 'no-update', clientData[1], '', moment().format('YYYY/MM/DD HH:mm')];
                            let json = {
                                request: data,
                                actionName,
                                unique: { status: false },
                                returnDataFormat,
                                updateFieldValue,
                                queryJSON: { _id },
                                queryString,
                                querySchema: 'Kullanici',
                            };
                            queryManager.Update(json, (result) => {
                                result['arr']['password'] = "********";
                                callback(result);
                            });
                        }
                        else {
                            callback({ status: true, info: 'Eski şifreniz uyuşmuyor!' });
                        };
                    }
                    else {
                        callback({ status: false });
                    };
                });
            }
            else {
                callback({ status: true, info: 'Yeni şifreniz minimum 8 karakterden oluşmalıdır!' });
            };
        }
        else {
            callback({ status: true, info: 'Eski şifreniz ile yeni şifreniz aynı olamaz!' });
        };
    }
    else {
        callback({ status: true, info: 'Yeni şifreleriniz uyuşmuyor!' });
    };
};
module.exports = {
    Click,
    Update
};