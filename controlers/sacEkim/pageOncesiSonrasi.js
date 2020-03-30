const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'before after';
const schemaOncesiSonrasi = require('../../models/sacEkim/schemaOncesiSonrasi');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        before: '',
        after: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: {},
        querySchema: 'OncesiSonrasi'
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
    let newData = new schemaOncesiSonrasi({
        before: clientData[0],
        after: clientData[1],
    });
    let returnDataFormat = ['_id', 'before', 'after'];
    delete data['data'];
    let json = {
        request: data, actionName,
        newData,
        createInfo: { status: false },
        unique: { status: false},
        returnDataFormat
    };
    queryManager.Insert(json, (processStatus) => {
        callback(processStatus);
    });
};
const Delete = (data, actionName, callback) => {
    let _id = htmlspecialchar(data.processID);
    let json = {
        request: data,
        actionName,
        queryJSON: { _id, },
        querySchema: 'OncesiSonrasi',
        dtColLen: 2,
    };
    queryManager.Delete(json, (result) => {
        callback(result);
    });
};
module.exports = {
    Click,
    Insert,
    Delete,
};