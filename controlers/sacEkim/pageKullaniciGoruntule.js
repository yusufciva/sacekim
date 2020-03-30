const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'fullName passportID userTitle';
const mongoose = require('mongoose');
const schemaKullanici = require('../../models/sacEkim/schemaKullanici');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        fullName: '',        
        passportID: '',
        userTitle: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString: 'fullName passportID username password userTitle ogrenciNo gender email address phonenumber1 phonenumber2',
        queryJSON: {},
        querySchema: 'Kullanici'
    };
    queryManager.Click(json, (result) => {
        result['tableData'] = tableData;
        callback(result);
    });
};
const Get = (data, actionName, callback) => {
    let _id = mongoose.Types.ObjectId(htmlspecialchar(data._id));
    let json = {
        request: data,
        multiple: true,
        actionName,
        queryJSON: { _id },
        querySchema: 'Kullanici',
        queryString,
        slimID: true,
    };
    queryManager.Get(json, (result) => {
        callback(result);
    });
};
module.exports = {
    Click,
    Get
};