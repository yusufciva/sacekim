const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'ad gender ulke telefon eposta tip yas ilac kronik status' ;

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
        queryJSON: { status: "Dönüş sağlandı", },
        querySchema: 'SacAnalizTalebi'
    };
    queryManager.Click(json, (result) => {
        callback(result);
    });
};
module.exports = {
    Click,
};