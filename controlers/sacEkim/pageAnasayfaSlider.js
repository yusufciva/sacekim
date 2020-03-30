const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'baslikKisim1TR baslikKisim2TR baslikKisim3TR gorsel';
const schemaAnasayfaSlider = require('../../models/sacEkim/schemaAnasayfaSlider');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        baslikKisim1TR: '',
        baslikKisim2TR: '',
        baslikKisim3TR: '',
        gorsel: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: {},
        querySchema: 'AnasayfaSlider'
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
    let uniqueFields = {};
    let newData = new schemaAnasayfaSlider({
        baslikKisim1TR: clientData[0],
        baslikKisim2TR: clientData[1],
        baslikKisim3TR: clientData[2],
        baslikKisim1EN: clientData[3],
        baslikKisim2EN: clientData[4],
        baslikKisim3EN: clientData[5],
        baslikKisim1ES: clientData[6],
        baslikKisim2ES: clientData[7],
        baslikKisim3ES: clientData[8],
        baslikKisim1FR: clientData[9],
        baslikKisim2FR: clientData[10],
        baslikKisim3FR: clientData[11],
        baslikKisim1DE: clientData[12],
        baslikKisim2DE: clientData[13],
        baslikKisim3DE: clientData[14],
        baslikKisim1IT: clientData[15],
        baslikKisim2IT: clientData[16],
        baslikKisim3IT: clientData[17],
        baslikKisim1AR: clientData[18],
        baslikKisim2AR: clientData[19],
        baslikKisim3AR: clientData[20],
        baslikKisim1PT: clientData[21],
        baslikKisim2PT: clientData[22],
        baslikKisim3PT: clientData[23],
        baslikKisim1RU: clientData[24],
        baslikKisim2RU: clientData[25],
        baslikKisim3RU: clientData[26],
        gorsel: clientData[27],
    });
    let returnDataFormat = ['_id', 'baslikKisim1TR', 'baslikKisim2TR', 'baslikKisim3TR', 'gorsel'];
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
        querySchema: 'AnasayfaSlider',
        dtColLen: 4,
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