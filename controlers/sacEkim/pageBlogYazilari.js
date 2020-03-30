const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'gorsel baslikTR createUser createDate';
const schemaBlogYazilari = require('../../models/sacEkim/schemaBlogYazilari');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        gorsel: '',
        baslikTR: '',
        createUser: '',
        createDate: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: {},
        querySchema: 'BlogYazilari'
    };
    queryManager.Click(json, (result) => {
        callback(result);
    });
};
const Insert = (data, actionName, callback) => {
    let clientData = data.data;
    let newData = new schemaBlogYazilari({
        baslikTR: clientData[9],
        baslikEN: clientData[10],
        baslikES: clientData[11],
        baslikFR: clientData[12],
        baslikDE: clientData[13],
        baslikIT: clientData[14],
        baslikAR: clientData[15],
        baslikPT: clientData[16],
        baslikRU: clientData[17],
        gorsel: clientData[18],
        yaziTR: clientData[0],
        yaziEN: clientData[1],
        yaziES: clientData[2],
        yaziFR: clientData[3],
        yaziDE: clientData[4],
        yaziIT: clientData[5],
        yaziAR: clientData[6],
        yaziPT: clientData[7],
        yaziRU: clientData[8],
    });
    let returnDataFormat = ['_id',  'baslikTR','gorsel', 'createUser', 'createDate'];
    delete data['data'];
    let json = {
        request: data, actionName,
        newData,
        createInfo: { status: true, editFormat: 'YYYY/MM/DD HH:mm', createFormat: 'YYYY/MM/DD HH:mm' },
        unique: { status: false },
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
        querySchema: 'BlogYazilari',
        dtColLen: 3,
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