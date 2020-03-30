const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const permissions = require('../permissions');

const Click = (data, actionName, callback) => {
    permissions.ctrlJwtAndPerm(htmlspecialchar(data.ucid), actionName, (data2) => {
        if (data2.status) {
            let username = data2.uname;
            if (data2.userType == 3) {
                schemaFirma.findOne({ kurumsalEmail: username }).then((data3) => {
                    if (data3) {
                        let firmaAdi = data3.isyeriAdi;
                        let tableData = [{
                            _id: '',
                            userTitle: '',
                            firmaAdi: '',
                            fullName: '',
                            email: '',
                        }];
                        let json = {
                            request: data,
                            tableData,
                            actionName,
                            queryString: 'userTitle firmaAdi fullName email',
                            queryJSON: { username, },
                            querySchema: 'Kullanici'
                        };
                        queryManager.Click(json, (result) => {
                            result['tableData'][0]['firmaAdi'] = firmaAdi;
                            result['utype'] = data2.userType;
                            callback(result);
                        });
                    }
                    else {
                        callback({ status: false });
                    };
                });
            }
            else if (data2.userType == 4) {
                let tableData = [{
                    _id: '',
                    userTitle: '',
                    ogrenciNo: '',
                    passportID: '',
                    fullName: '',
                    gender: '',
                    email: '',
                }];
                let json = {
                    request: data,
                    tableData,
                    actionName,
                    queryString: 'userTitle ogrenciNo passportID fullName gender email',
                    queryJSON: { username, },
                    querySchema: 'Kullanici'
                };
                queryManager.Click(json, (result) => {
                    result['utype'] = data2.userType;
                    callback(result);
                });
            }
            else {
                let tableData = [{
                    _id: '',
                    userTitle: '',
                    passportID: '',
                    fullName: '',
                    gender: '',
                    email: '',
                }];
                let json = {
                    request: data,
                    tableData,
                    actionName,
                    queryString: 'userTitle passportID fullName gender email',
                    queryJSON: { username, },
                    querySchema: 'Kullanici'
                };
                queryManager.Click(json, (result) => {
                    result['utype'] = data2.userType;
                    callback(result);
                });
            };
        }
        else {
            callback({ status: false });
        };
    });

};
module.exports = {
    Click,
};