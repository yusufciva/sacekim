const JWT = require('./controlers/JWT');
const userQuery = require('./controlers/userQuery');
const menuCreator = require('./controlers/menuCreator');
const moduleSettings = require('./models/moduleSettings');

const middleware = (req, res, next) => {
    if (req.cookies['ucid'] && req.url == '/yonetim') {
        JWT.verify(req.cookies['ucid'], (dataVerify) => {
            if (dataVerify.status) { // hata yoksa
                userQuery.get(dataVerify.data, (dataUser) => {
                    if (dataUser) {
                        moduleSettings.findOne({}).then((dataModule) => {
                            //Kullanıcı bilgileri veri tabanında kayıtlıysa
                            menuCreator.create(dataUser.userType, dataModule.moduleName, (dataMenu) => {//yetkiye göre menü htmlini oluşturur
                                if (dataUser.userType == 1 || dataUser.userType == 2) {
                                    userQuery.maingPageData(1, null, (mainPageData) => {
                                        res.render('' + dataModule.moduleName + '/index', {
                                            username: (dataUser.name ? dataUser.name : dataUser.fullName),
                                            usersurname: (dataUser.surname ? dataUser.surname : ''),
                                            kullanici: mainPageData.kullanici,
                                            userlogo: dataUser.userlogo,
                                            menuHTML: dataMenu,
                                            userType: dataUser.userType,
                                            userTitle: dataUser.userTitle,
                                            titleLeft: (dataUser.userType == 4 ? '6' : '-5'),
                                            yonetim: 1
                                        });
                                    });
                                }
                            });
                        });
                    }
                    else {
                        //Her ihtimale karşı değilse
                        res.clearCookie('ucid');
                        res.redirect('/');
                    };
                });
            }
            else {
                //jwt doğrulanmadıysa
                res.clearCookie('ucid');
                res.redirect('/');
            };
        });
    }
    else {
        if ((req.url == '/forgetPass') && req.cookies['ucid']) {
            res.redirect('/');
        }
        else {
            next();
        };
    };
};

module.exports = middleware;
