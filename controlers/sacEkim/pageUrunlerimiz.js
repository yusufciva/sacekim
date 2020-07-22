const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'gorsel urunAdiTR yaziTR createUser createDate';
const schemaUrunlerimiz = require('../../models/sacEkim/schemaUrunlerimiz');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        gorsel: '',
        urunAdiTR: '',
        yaziTR: '',
        createUser: '',
        createDate: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: {},
        querySchema: 'Urunlerimiz'
    };
    queryManager.Click(json, (result) => {
        callback(result);
    });
};
const Insert = (data, actionName, callback) => {
    let clientData = data.data;
    let newData = new schemaUrunlerimiz({
        urunAdiTR: clientData[0],
        urunAdiEN: clientData[1],
        urunAdiES: clientData[2],
        urunAdiFR: clientData[3],
        urunAdiDE: clientData[4],
        urunAdiIT: clientData[5],
        urunAdiAR: clientData[6],
        urunAdiPT: clientData[7],
        urunAdiRU: clientData[8],
        gorsel: clientData[18],
        yaziTR: clientData[9],
        yaziEN: clientData[10],
        yaziES: clientData[11],
        yaziFR: clientData[12],
        yaziDE: clientData[13],
        yaziIT: clientData[14],
        yaziAR: clientData[15],
        yaziPT: clientData[16],
        yaziRU: clientData[17],
    });
    let returnDataFormat = ['_id', 'urunAdiTR', 'gorsel', 'yaziTR', 'createUser', 'createDate'];
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