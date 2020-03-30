const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'ad gender ulke telefon eposta tip yas ilac kronik' ;
const schemaSacAnalizTalebi = require('../../models/sacEkim/schemaSacAnalizTalebi');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        ad: '',
        gender: '',
        ulke: '',
        telefon: '',
        eposta: '',
        tip: '',
        yas: '',
        ilac: '',
        kronik: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString,
        queryJSON: { status: 'Dönüş yapılmadı' },
        querySchema: 'SacAnalizTalebi'
    };
    queryManager.Click(json, (result) => {
        callback(result);
    });
};
const Insert = (data, actionName, callback) => {
    let clientData = data.json;
    for (let i = 0; i < Object.keys(clientData).length; i++) {
        clientData[Object.keys(clientData)[i]] = htmlspecialchar(clientData[Object.keys(clientData)[i]]);
        
    };
    let newData = new schemaSacAnalizTalebi({
        ad: clientData.ad,
        gender: clientData.gender,
        tip: clientData.tip,
        yas: clientData.yas,
        ilac: clientData.ilac,
        kronik: clientData.kronik,
        ulke: clientData.ulke,
        telefon: clientData.telefon,
        eposta: clientData.eposta,
        status: "Dönüş yapılmadı",
    });
    newData.save((err) => {
        if (err) {
            console.log("Analiz kaydında bir sorun oluştu.");
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
        querySchema: 'SacAnalizTalebi',
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