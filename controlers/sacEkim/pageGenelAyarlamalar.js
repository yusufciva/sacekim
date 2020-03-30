const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'baslikKisim1 baslikKisim2 telefon eposta';
const schemaGenelAyarlamalar = require('../../models/sacEkim/schemaGenelAyarlamalar');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        baslikKisim1: '',
        baslikKisim2: '',
        telefon: '',
        eposta: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: {},
        querySchema: 'GenelAyarlamalar'
    };
    queryManager.Click(json, (result) => {
        callback(result);
    });
};
const Insert = (data, actionName, callback) => {
    let clientData = data.data;
    for (let i = 0; i < clientData.length; i++) {
        clientData[i] = htmlspecialchar(clientData[i]);
    };
    let uniqueFields = { };
    let newData = new schemaGenelAyarlamalar({
        baslikKisim1: clientData[0],
        baslikKisim2: clientData[1],
        telefon: clientData[2],
        eposta: clientData[3],
    });
    let returnDataFormat = ['_id', 'baslikKisim1', 'baslikKisim2', 'telefon', 'eposta'];
    delete data['data'];
    let json = {
        request: data, actionName,
        newData,
        createInfo: { status: false },
        unique: { status: true, uniqueFields },
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
    let returnDataFormat = ['_id', 'baslikKisim1', 'baslikKisim2', 'telefon', 'eposta'];
    let updateFieldValue = ['', clientData[0], clientData[1], clientData[2], clientData[3]];
    let json = {
        request: data,
        actionName,
        returnDataFormat,
        updateFieldValue,
        unique: { status: false, },
        queryJSON: { _id },
        queryString,
        querySchema: 'GenelAyarlamalar',
        hasBelong: false,
    };
    queryManager.Update(json, (result) => {
        callback(result);
    });
};
module.exports = {
    Click,
    Insert,
    Update,
};