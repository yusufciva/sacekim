const permissions = require('./permissions');
const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment.locale('tr');

let schemaAction = ['Kullanici','SistemMail',"GenelAyarlamalar","AnasayfaSlider","Urunlerimiz","OncesiSonrasi","BlogYazilari","IletisimTalebi","SacAnalizTalebi"];
let schema = [];
for (let i = 0; i < schemaAction.length; i++) {
    let key = schemaAction[i];
    schema[key] = require('../models/sacEkim/schema' + key + '');
};
const dataFormatCreator = (arr, format, callback) => {
    if (format) {
        let len = format.length;
        let returnDataFormat = {};
        for (let i = 0; i < format.length; i++) {
            let key = format[i];
            returnDataFormat[key] = arr[key];
            if (i == len - 1) {//Asenkron işlem sorunu olmaması için önlem amaçlı
                callback(returnDataFormat);
            };
        };
    }
    else {
        callback(false);
    };
};
//İnsert
const insertData = (newData, format, createInfo, callback) => {
    if (createInfo.status) {//True gelirse her zaman oluşturan ve düzenleyen kişi ismini ilk kayıt için oluşturur
        newData['editUser'] = createInfo.fullName;
        newData['createUser'] = createInfo.fullName;
        newData['editDate'] = moment().format('YYYY/MM/DD HH:mm');
        newData['createDate'] = moment().format('YYYY/MM/DD HH:mm');
    };
    // if (!newData.validateSync()) {
    //     newData.save((err, data) => {
    //         if (!err) {
    //             dataFormatCreator(data, format, (dataTableFormatArr) => {
    //                 callback({ status: true, info: 2, arr: dataTableFormatArr }) //İşlem başarılıysa
    //             })
    //         }
    //         else {
    //             callback({ status: true, info: 1 })
    //         };
    //     }) //Şema validasyon hatası varsa
    // }
    // else {
    //     callback({ status: true, info: 4 });
    // }
    newData.save((err, data) => {
        (!err) ? dataFormatCreator(data, format, (dataTableFormatArr) => {
            callback({ status: true, info: 2, arr: dataTableFormatArr }) //İşlem başarılıysa
        }) : callback({ status: true, info: 1 });
    })
};
const Insert = (json, callback) => {
    let newData = json.newData;
    let req = json.request;
    let ucid = htmlspecialchar(req.ucid);
    let actionName = json.actionName;
    let pk = json.unique.status;//Benzersiz alan içerek sorgu
    let createInfo = json.createInfo;
    let unq = json.unique;
    permissions.ctrlJwtAndPerm(ucid, actionName, (permData) => {
        createInfo ? createInfo['fullName'] = permData.fullName : '';
        (permData.status) ?
            (pk) ? //Unique bir alan için kayıt yapılcaksa
                schema[(!json.querySchema ? req.processSocket : json.querySchema)].findOne(pk ? unq.uniqueFields : unq.fields).collation({ locale: 'tr', strength: 1 }).then((queryData) => {
                    (!queryData) ?
                        insertData(newData, json.returnDataFormat, createInfo, (statusData) => {
                            callback(statusData);
                        })
                        : callback({ status: true, info: 3 }); //Veri zaten kayıtlıysa
                })
                : insertData(newData, json.returnDataFormat, createInfo, (statusData) => {
                    callback(statusData); //Unique bir alan için kayıt yapılmayacaksa
                })
            : callback({ status: false }); //Yetkilendirme başarısız
    });
};
//Click
const Click = (json, callback) => {
    let req = json.request;
    let ucid = htmlspecialchar(req.ucid);
    let actionName = json.actionName;
    permissions.ctrlJwtAndPerm(ucid, actionName, (permData) => {
        (permData.status) ?
            schema[json.querySchema].find(json.queryJSON, json.queryString).then((resultData) => {
                resultData.length > 0 ? callback({ status: true, info: 2, resultData, tableData: resultData })//Sorgu başarılı ve data döndüyse
                    : callback({ status: true, info: 2, resultData: [], tableData: json.tableData });//Sorgu başarılı data boşsa
            }) : callback({ status: false });//Yetkilendirme başarısızsa
    });
};
//Get
const Get = (json, callback) => {
    let req = json.request;
    let ucid = htmlspecialchar(req.ucid);
    let actionName = json.actionName;
    let slimObjID = json.slimID ? htmlspecialchar(req.slimObjID) : false;
    let noProcessDt = json.noProcessDt;
    permissions.ctrlJwtAndPerm(ucid, actionName, (permData) => {
        (permData.status) ?//Yetkilendirme başarılıysa
            (json.multiple) ?//Çoklu sorgulama sonucu dönmesi isteniyorsa
                schema[json.querySchema].find(json.queryJSON, json.queryString).collation({ locale: 'tr', strength: 1 }).then((result) => {
                    result.length > 0 ? callback({ status: true, info: 2, result, slimObjID, noProcessDt })
                        : callback({ status: true, info: 0, noProcessDt });
                })
                : console.log('şimdilik boş')
            : callback({ status: false });
    });
};
//Delete
const deleteData = (result, _id, colLen, callback) => {
    result.remove((err) => {
        !err ? callback({ status: true, info: 2, _id, colLen })//İşlem başarılı
            : callback({ status: true, info: 1, _id });//Mongodb kaynaklı hata oluştu
    });
};
const Delete = (json, callback) => {
    let req = json.request;
    let ucid = htmlspecialchar(req.ucid);
    let actionName = json.actionName;
    let queryJSON = json.queryJSON;
    let _id = queryJSON._id;

    permissions.ctrlJwtAndPerm(ucid, actionName, (permData) => {
        (permData.status) ?
            schema[json.querySchema].findOne(queryJSON).then((result) => {
                (json.hasBelong) ?
                    schema[json.belong.schema].find({ [json.belong.field]: _id }).then((resultParent) => {
                        (resultParent.length > 0) ?
                            callback({ status: true, info: 3 })
                            : (result) ?
                                deleteData(result, _id, json.dtColLen, (resultDelete) => {
                                    callback(resultDelete)
                                })
                                : callback({ status: true, info: 0 });//Veriye ulaşılamadı
                    })
                    : (result) ?
                        deleteData(result, _id, json.dtColLen, (resultDelete) => {
                            callback(resultDelete)
                        })
                        : callback({ status: true, info: 0 });//Veriye ulaşılamadı

            })
            : callback({ status: false });
    });
};
//Update
const updateData = (resultSelf, returnDataFormat, updateFieldValue, fullName, callback) => {
    for (let i = 0; i < returnDataFormat.length; i++) {
        if (returnDataFormat[i] != '_id' && returnDataFormat[i] != 'editUser') {
            if (updateFieldValue[i] != 'no-update') {
                resultSelf[returnDataFormat[i]] = updateFieldValue[i];
            };
        }
        else {
            if (returnDataFormat[i] == 'editUser') {
                resultSelf.editUser = fullName;
            };
        };
        if (i == returnDataFormat.length - 1) {//Asenkron yapı problemi olmaması için
            resultSelf.save((err, data) => {
                if (!err) {
                    dataFormatCreator(data, returnDataFormat, (resultFormat) => {
                        callback({ status: true, info: 2, arr: resultFormat });//Kayıt başarılı
                    });
                }
                else {
                    callback({ status: true, info: 1 });//Mongodb kaynaklı hata
                };
            });
        };
    };
};
const Update = (json, callback) => {
    let req = json.request;
    let ucid = htmlspecialchar(req.ucid);
    let actionName = json.actionName;
    permissions.ctrlJwtAndPerm(ucid, actionName, (permData) => {
        if (permData.status) {
            schema[json.querySchema].findOne(json.queryJSON, json.queryString).collation({ locale: 'tr', strength: 1 }).then((resultSelf) => {//Güncellencek datayı bulur
                if (resultSelf) {
                    if (json.unique.status) {//Unique alan sorgulaması olcaksa
                        schema[json.querySchema].findOne(json.unique.uniqueFields).collation({ locale: 'tr', strength: 1 }).then((updateCtrlData) => {
                            if (!updateCtrlData) {
                                if (json.hasBelong) {//Alt bağlılık sorgulaması olucacaksa
                                    schema[json.belong.schema].find((!json.belong.additionalQuery ? { [json.belong.field]: resultSelf['_id'] } : json.belong.additionalQuery)).collation({ locale: 'tr', strength: 1 }).then((belongData) => {
                                        if (belongData.length > 0) {
                                            callback({ status: true, info: 5 });//Bağlı kayıt varsa
                                        }
                                        else {//Alt bağlılık bulunamadıysa
                                            updateData(resultSelf, json.returnDataFormat, json.updateFieldValue, permData.fullName, (updateDate) => {
                                                callback(updateDate);
                                            });
                                        };
                                    });
                                }
                                else {//Alt bağlılık ayarı yoksa
                                    updateData(resultSelf, json.returnDataFormat, json.updateFieldValue, permData.fullName, (updateDate) => {
                                        callback(updateDate);
                                    });
                                };
                            }
                            else {
                                if (json.queryJSON._id.toString() == updateCtrlData['_id'].toString() && !json.unique.cancelMatchID) {
                                    if (json.hasBelong) {//Alt bağlılık sorgulaması olucacaksa
                                        schema[json.belong.schema].find((!json.belong.additionalQuery ? { [json.belong.field]: resultSelf['_id'] } : json.belong.additionalQuery)).collation({ locale: 'tr', strength: 1 }).then((belongData) => {
                                            if (belongData.length > 0) {
                                                callback({ status: true, info: 5 });//Bağlı kayıt varsa
                                            }
                                            else {//Alt bağlılık bulunamadıysa
                                                updateData(resultSelf, json.returnDataFormat, json.updateFieldValue, permData.fullName, (updateDate) => {
                                                    callback(updateDate);
                                                });
                                            };
                                        });
                                    }
                                    else {//Alt bağlılık ayarı yoksa
                                        updateData(resultSelf, json.returnDataFormat, json.updateFieldValue, permData.fullName, (updateDate) => {
                                            callback(updateDate);
                                        });
                                    };
                                }
                                else {
                                    callback({ status: true, info: 3 });//Aynı isimde veri varsa
                                };
                            };
                        });
                    }
                    else {//Unique alan sorgulaması yoksa
                        if (json.hasBelong) {//Alt bağlılık sorgulaması olucacaksa
                            schema[json.belong.schema].find((!json.belong.additionalQuery ? { [json.belong.field]: resultSelf['_id'] } : json.belong.additionalQuery)).collation({ locale: 'tr', strength: 1 }).then((belongData) => {
                                if (belongData.length > 0) {
                                    callback({ status: true, info: 5 });//Bağlı kayıt varsa
                                }
                                else {//Alt bağlılık bulunamadıysa
                                    updateData(resultSelf, json.returnDataFormat, json.updateFieldValue, permData.fullName, (updateDate) => {
                                        callback(updateDate);
                                    });
                                };
                            });
                        }
                        else {//Alt bağlılık ayarı yoksa
                            updateData(resultSelf, json.returnDataFormat, json.updateFieldValue, permData.fullName, (updateDate) => {
                                callback(updateDate);
                            });
                        };
                    };
                }
                else {
                    callback({ status: true, info: 0 });//Güncellenmek istenen veri bulunamadıysa
                };
            });
        }
        else {
            callback({ status: false });
        };
    });
};
module.exports = {
    Insert,
    Click,
    Get,
    Delete,
    Update
}
