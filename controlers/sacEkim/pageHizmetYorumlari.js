const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'gorsel hastaAdi hastaYorumTR';
const schemaHizmetYorumlari = require('../../models/sacEkim/schemaHizmetYorumlari');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        gorsel: '',
        hastaAdi: '',
        hastaYorumTR: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: {},
        querySchema: 'HizmetYorumlari'
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
    let newData = new schemaHizmetYorumlari({
        gorsel: clientData[10],
        hastaAdi: clientData[0],
        hastaYorumTR: clientData[1],
        hastaYorumEN: clientData[2],
        hastaYorumES: clientData[3],
        hastaYorumFR: clientData[4],
        hastaYorumDE: clientData[5],
        hastaYorumIT: clientData[6],
        hastaYorumAR: clientData[7],
        hastaYorumPT: clientData[8],
        hastaYorumRU: clientData[9],
    });
    let returnDataFormat = ['_id', 'gorsel', 'hastaAdi', 'hastaYorumTR'];
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
        querySchema: 'HizmetYorumlari',
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