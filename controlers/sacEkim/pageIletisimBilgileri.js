const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'email address phonenumber1 phonenumber2';
const permission = require('../permissions');
const mongoose = require('mongoose');

const Click = (data, actionName, callback) => {
    permission.ctrlJwtAndPerm(htmlspecialchar(data.ucid), actionName, (permData) => {
        if (permData.status) {
            let tableData = [{
                _id: '',
                email: '',
                address: '',
                phonenumber1: '',
                phonenumber2: '',
            }];
            let json = {
                request: data,
                tableData,
                actionName,
                queryString,
                queryJSON: { username: permData.uname },
                querySchema: 'Kullanici'
            };
            queryManager.Click(json, (result) => {
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
    let returnDataFormat = ['_id', 'email', 'address', 'phonenumber1', 'phonenumber2','editUser','editDate'];
    let updateFieldValue = ['', 'no-update', clientData[1], clientData[2], clientData[3], '', moment().format('YYYY/MM/DD HH:mm')];
    let json = {
        request: data,
        actionName,
        unique: { status: false},
        returnDataFormat,
        updateFieldValue,
        queryJSON: { _id },
        queryString,
        querySchema: 'Kullanici',
    };
    queryManager.Update(json, (result) => {
        delete result['arr']['editUser'];
        delete result['arr']['editDate'];
        callback(result);
    });
};
module.exports = {
    Click,
    Update
};