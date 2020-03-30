const schemaKullanici = require('../models/sacEkim/schemaKullanici');
const JWT = require('../controlers/JWT');
const permissions = require('../models/permissions');
const moduleSettings = require('../models/moduleSettings');

const get = (actionName, callback) => {
    permissions.findOne({ actionName }).then((data) => {
        data ? callback(data.userType) : callback(false);
    });
};
const insert = (actionName, userTypes, callback) => {
    let newPermissions = new permissions({
        actionName: actionName,
        userType: userTypes,
    });
    newPermissions.save((err) => {
        !err ? callback(true) : callback(false);
    });
};
const ctrlJwtAndPerm = (jwtToken, actionName, callback) => {
    JWT.verify(jwtToken, (data) => {
        if (data.status) {
            //JWT DOĞRUYSA
            let uname = data.data;
            get(actionName, (data2) => {
                if (data2) {
                    ctrlUserPerm(uname, data2, (data3) => {
                        data3.status ? callback({ status: true, _id: data3._id, uname: uname, fullName: data3.fullName, userType: data3.userType }) : callback({ status: false });
                    });
                }
                else {
                    callback(false);
                };
            });
        }
        else {
            //JWT DOĞRULANMADIYSA
            callback(false);
        };
    });
};
async function ctrlUserPerm(uname, permID, callback) {
    await schemaKullanici.findOne({ username: uname }).then((data) => {
        let control;
        let _id;
        let fullName;
        if (data && data.status) {
            fullName = data.fullName;
            userType = data.userType;
            _id = data._id;
            for (let i = 0; i < permID.length; i++) {
                if (permID[i] == userType) {
                    control = 1;
                };
            };
        }
        else {
            //Kullanıcı bulunamadıysa yetkisiz işlem algılayacak
            callback({ status: false });
        };
        if (control == 1) {
            //Kullanıcının tipi işlem numarası ile eşleşiyorsa
            callback({ status: true, fullName, userType, _id });
        }
        else {
            //Eşleşmiyorsa
            callback({ status: false });
        };
    });
};
async function controlAndCreate(options) {
    let error = 0;
    for (let i = 0; i < options.length; i++) {
        await moduleSettings.findOne({}).then((moduleSettingsData) => {
            let modul = moduleSettingsData.moduleName;
            let processKey = Object.keys(options[i].process);
            for (let j = 0; j < processKey.length; j++) {
                let actionName = modul + "_" + options[i].schemaName + "_" + processKey[j];
                permissions.findOne({ actionName }).then((permissionsData) => {
                    if (!permissionsData) {
                        let createPerm = new permissions({
                            userType: options[i].permissions,
                            actionName
                        });
                        createPerm.save((err) => {
                            if (err) {
                                error++;
                                console.log("Yetki kayıtları oluşturulduğu esnada hata oluştu!!");
                            };
                        });
                    };
                });
            };
        });
        if (options.length - 1 == i) {
            if (error != 0) {
                console.log(error + " adet yetki kaydı oluşturulamadı!!!");
            }
            else {
                console.log("Tüm yetki kayıtları başarıyla kontrol edildi ve oluşturuldu.");
            };
        };
    };
};
module.exports = {
    get,
    insert,
    ctrlJwtAndPerm,
    ctrlUserPerm,
    controlAndCreate
};