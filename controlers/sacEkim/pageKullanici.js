const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'birimAdi editDate editUser status';

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        status: '',
        birimAdi: '',
        editUser: '',
        editDate: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: {},
        querySchema: 'Birim'
    };
    queryManager.Click(json, (result) => {
        callback(result);
    });
};
const Delete = (data, actionName, callback) => {
    let _id = htmlspecialchar(data.processID);
    let json = {
        request: data,
        actionName,
        queryJSON: { _id, },
        querySchema: 'Birim',
        dtColLen: 5,
        hasBelong: true,
        belong: {
            schema: 'Bolum',
            field: 'parentID'
        }
    };
    queryManager.Delete(json, (result) => {
        callback(result);
    });
};
const Insert = (data, actionName, callback) => {
    let clientData = data.data;
    for (let i = 0; i < clientData.length; i++) {
        clientData[i] = htmlspecialchar(clientData[i]);
    };
    let birimAdi = clientData[0];
    let uniqueFields = { birimAdi };
    let newData = new schemaBirim({
        status: clientData[1],
        birimAdi,
    });
    let returnDataFormat = ['_id', 'status', 'birimAdi', 'editUser', 'editDate'];
    delete data['data'];
    let json = {
        request: data,
        createInfo: { status: true, editFormat: 'YYYY/MM/DD HH:mm', createFormat: 'YYYY/MM/DD HH:mm' },//True olduğu durumda ilk kayıt için her zaman düzenleyen ve oluşturan bilgisini kaydeder
        actionName,
        unique: { status: true, uniqueFields },
        newData,
        returnDataFormat
    };
    queryManager.Insert(json, (processStatus) => {
        callback(processStatus);
    });
};
const Update = (data, actionName, callback) => {
    let _id = htmlspecialchar(data.processID);
    let clientData = data.data;
    for (let i = 0; i < clientData.length; i++) {
        clientData[i] = htmlspecialchar(clientData[i]);
    };
    let returnDataFormat = ['_id', 'status', 'birimAdi', 'editUser', 'editDate'];
    let updateFieldValue = ['', clientData[1], clientData[0], '', moment().format('YYYY/MM/DD HH:mm')];
    let uniqueFields = { birimAdi: clientData[0] };
    let json = {
        request: data,
        actionName,
        unique: { status: true, uniqueFields },
        returnDataFormat,
        updateFieldValue,
        queryJSON: { _id },
        queryString,
        querySchema: 'Birim',
        hasBelong: true,
        belong: {
            schema: 'Bolum',
            field: 'parentID'
        }
    };
    queryManager.Update(json, (result) => {
        callback(result);
    });
};
module.exports = {
    Click,
    Delete,
    Insert,
    Update
};