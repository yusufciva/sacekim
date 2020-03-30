const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'isim eposta mesaj createDate status';
const schemaIletisimTalebi = require('../../models/sacEkim/schemaIletisimTalebi');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        isim: '',
        eposta: '',
        mesaj: '',
        createDate: '',
        status: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: {status:'Dönüş yapılmadı'},
        querySchema: 'IletisimTalebi'
    };
    queryManager.Click(json, (result) => {
        callback(result);
    });
};
const Insert = (data, actionName, callback) => {
    let clientData = data;
    let newData = new schemaIletisimTalebi({
        isim: htmlspecialchar(clientData.name),
        eposta: htmlspecialchar(clientData.mail),
        mesaj: htmlspecialchar(clientData.text),
        createDate: moment().format("DD/MM/YYYY HH:mm"),
        status: "Dönüş yapılmadı",
    });
    newData.save((err) => {
        if (!err) {
            callback({ status: true });
        }
        else {
            callback({status:false});
        };
    });
};
const Update = (data, actionName, callback) => {
    let _id = htmlspecialchar(data.processID);
    let clientData = data.data;
    for (let i = 0; i < clientData.length; i++) {
        clientData[i] = htmlspecialchar(clientData[i]);
    };
    let returnDataFormat = ['_id', 'status',];
    let updateFieldValue = ['', clientData[0]];
    let json = {
        request: data,
        actionName,
        returnDataFormat,
        updateFieldValue,
        unique: { status: false, },
        queryJSON: { _id },
        queryString,
        querySchema: 'IletisimTalebi',
        hasBelong: false,
    };
    queryManager.Update(json, (result) => {
        result['deleteRow'] = true;
        callback(result);
    });
};
module.exports = {
    Click,
    Insert,
    Update,
};