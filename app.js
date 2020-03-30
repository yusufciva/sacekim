// ENVIRONMENT VARIABLES //
require('dotenv').config();
let env = process.env;
// SERVER //
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// SERVER END //
// HELPERS NPM PACKAGES //
const htmlspecialchars = require('htmlspecialchars');//socket isteklerinde kod olması ihtimaline karşı
const cookieParser = require('cookie-parser'); // Cookie yönetimini kolaylaştırmak için
app.use(cookieParser());
// HELPERS NPM PACKAGES  END//

//EJS VIEW ENGINE//
const expressEjsLayout = require('express-ejs-layouts');
app.use(expressEjsLayout);
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));
//EJS VIEW ENGINE END//

// MONGODB //
const dbConnection = require('./models/dbConnection');//connection
// MONGODB END //

//DATE OPTIONS //
const moment = require('moment');
const business = require('moment-business-days');
moment.updateLocale('tr', {
    workingWeekdays: [1, 2, 3, 4, 5]
});
//DATE OPTIONS END //

// MIDDLEWARE //
const middleware = require('./middleware');
app.use(middleware);

// MIDDLEWARE END //

// ROUTERS //
const routerOSS = require('./routers/routers');
app.use(routerOSS);
// ROUTERS END//

// HELPERS FUNCTION //
const permissions = require('./controlers/permissions');
const moduleSettings = require('./models/moduleSettings');
const sistemMail = require('./controlers/sistemMail');
const menuCreator = require('./controlers/menuCreator');


//Sistem e-mail ayarları için
sistemMail.startServer();
//Menu kontrol ve oluşturma işlemleri için


const userQuery = require('./controlers/userQuery');//Giriş işlemi için
const JWT = require('./controlers/JWT');//JWT ile veri şifrelemek için);
const pageKullaniciGoruntule = require('./controlers/sacEkim/pageKullaniciGoruntule');
const pageBilgilerim = require('./controlers/sacEkim/pageBilgilerim');
const pageIletisimBilgileri = require('./controlers/sacEkim/pageIletisimBilgileri');
const pageSifreDegistir = require('./controlers/sacEkim/pageSifreDegistir');
const pageEmailTanimlama = require('./controlers/sacEkim/pageEmailTanimlama');
const pageGenelAyarlamalar = require('./controlers/sacEkim/pageGenelAyarlamalar');
const pageAnasayfaSlider = require('./controlers/sacEkim/pageAnasayfaSlider');
const pageHizmetYorumlari = require('./controlers/sacEkim/pageHizmetYorumlari');
const pageOncesiSonrasi = require('./controlers/sacEkim/pageOncesiSonrasi');
const pageBlogYazilari = require('./controlers/sacEkim/pageBlogYazilari');
const pageIletisimTalebi = require('./controlers/sacEkim/pageIletisimTalebi');
const pageSacAnalizTalebi = require('./controlers/sacEkim/pageSacAnalizTalebi');
const pageIletisimKayitlari = require('./controlers/sacEkim/pageIletisimKayitlari');
const pageSacAnaliziKayitlari = require('./controlers/sacEkim/pageSacAnaliziKayitlari');

// SOCKET REQUESTS //
const socketListener = [//Socket dinleyicilerini dinamik oluşturmak için
    {
        schemaName: 'KullaniciGoruntule',
        manager: pageKullaniciGoruntule,
        process: { Click: true, Get: true },
        permissions: [1]
    },
    {
        schemaName: 'Bilgilerim',
        manager: pageBilgilerim,
        process: { Click: true },
        permissions: [1, 2, 3, 4]
    },
    {
        schemaName: 'IletisimBilgileri',
        manager: pageIletisimBilgileri,
        process: { Click: true, Update: true },
        permissions: [1, 2, 3, 4]
    },
    {
        schemaName: 'SifreDegistir',
        manager: pageSifreDegistir,
        process: { Click: true, Update: true },
        permissions: [1, 2, 3, 4]
    },
    {
        schemaName: 'EmailTanimlama',
        manager: pageEmailTanimlama,
        process: { Click: true, Update: true, Insert: true, Delete: true },
        permissions: [1]
    },
    {
        schemaName: 'GenelAyarlamalar',
        manager: pageGenelAyarlamalar,
        process: { Click: true, Update: true, Insert: true },
        permissions: [1]
    },
    {
        schemaName: 'AnasayfaSlider',
        manager: pageAnasayfaSlider,
        process: { Click: true, Insert: true, Delete: true },
        permissions: [1]
    },
    {
        schemaName: 'HizmetYorumlari',
        manager: pageHizmetYorumlari,
        process: { Click: true, Insert: true, Delete: true },
        permissions: [1]
    },
    {
        schemaName: 'OncesiSonrasi',
        manager: pageOncesiSonrasi,
        process: { Click: true, Insert: true, Delete: true },
        permissions: [1]
    },
    {
        schemaName: 'BlogYazilari',
        manager: pageBlogYazilari,
        process: { Click: true, Insert: true, Delete: true },
        permissions: [1]
    },
    {
        schemaName: 'IletisimTalebi',
        manager: pageIletisimTalebi,
        process: { Click: true, Insert: true, Update: true },
        permissions: [1]
    },
    {
        schemaName: 'SacAnalizTalebi',
        manager: pageSacAnalizTalebi,
        process: { Click: true, Insert: true, Update: true },
        permissions: [1]
    },
    {
        schemaName: 'IletisimKayitlari',
        manager: pageIletisimKayitlari,
        process: { Click: true },
        permissions: [1]
    },
    {
        schemaName: 'SacAnaliziKayitlari',
        manager: pageSacAnaliziKayitlari,
        process: { Click: true },
        permissions: [1]
    },
    
];
moduleSettings.find({}).then((moduleOpt) => {
    if (moduleOpt.length == 0) {
        let newModuleOpt = new moduleSettings({
            moduleName: process.env.MODULE_NAME
        });
        newModuleOpt.save((err) => {
            if (!err) {
                console.log("Modül ayarları başarıyla oluşturuldu!");
                menuCreator.controlAndCreate();
                permissions.controlAndCreate(socketListener);//Permleri kontrol etmek ve oluşturmak için
            }
            else {
                console.warn("Modül ayarları oluşturulurken bir mongoDB hatası ile karşılaşıldı!");
                menuCreator.controlAndCreate();
                permissions.controlAndCreate(socketListener);//Permleri kontrol etmek ve oluşturmak için
            };
        })
    }
    else {
        menuCreator.controlAndCreate();
        permissions.controlAndCreate(socketListener);//Permleri kontrol etmek ve oluşturmak için
    };
});
io.on('connection', (socket) => {
    const socketEmitter = (socketName, params) => {
        //sadece isteği gerçekleştiren kişiye socket gönderir
        if (io.sockets.sockets[socket.id] != undefined) {
            if (!params['all']) {
                io.sockets.connected[socket.id].emit(socketName, params);
            }
            else {
                io.sockets.connected[socket.id].emit(socketName, params);
                io.sockets.emit(params['socketName'], params);
            };
        };
    };
    //Login için
    socket.on('loginSystem', (data) => {
        let uname = htmlspecialchars(data.username);
        let pass = htmlspecialchars(data.password);
        userQuery.login(uname, pass, (data2) => {
            if (data2.status) {//true ise
                if (data2.userStatus) {
                    JWT.create(uname, (data3) => {
                        if (data3) {
                            socketEmitter('loginStatus', { status: true, userStatus: true, cookie: data3 });
                        }
                        else {
                            //JWT İLE ŞİFRELEME ESNASINDA BİR HATA VARSA
                            //Şimdilik False Döner
                            console.log('JWT VERİ ŞİFRELEME ESNASINDA HATA VAR!!!');
                            socketEmitter('loginStatus', { status: false });
                        }
                    });
                }
                else {
                    socketEmitter('loginStatus', { status: true, userStatus: false });
                };
            }
            else {//false ise
                socketEmitter('loginStatus', { status: false });
            };
        });
    });
    socket.on('forgetPass', (data) => {
        let username = htmlspecialchars(data.username);
        userQuery.forgetPass(username, (processData) => {
            socketEmitter('forgetPass_Result', processData);
        });
    });
    socketListener.forEach(x => {
        x.process.Click ?
            socket.on('sacEkim_' + x.schemaName + '_Click', (data) => {
                (x.manager).Click(data, 'sacEkim_' + x.schemaName + '_Click', (clickData) => {
                    clickData.status ? socketEmitter('sacEkim_' + x.schemaName + '_Click_Result', clickData)
                        : socketEmitter('failedStatus', {});
                });
            }) : '';
        x.process.Delete ?
            socket.on('sacEkim_' + x.schemaName + '_Delete', (data) => {
                (x.manager).Delete(data, 'sacEkim_' + x.schemaName + '_Delete', (clickData) => {
                    clickData.status ? socketEmitter('sacEkim_' + x.schemaName + '_Delete_Result', clickData)
                        : socketEmitter('failedStatus', {});
                });
            }) : '';
        x.process.Insert ?
            socket.on('sacEkim_' + x.schemaName + '_Insert', (data) => {
                (x.manager).Insert(data, 'sacEkim_' + x.schemaName + '_Insert', (clickData) => {
                    clickData.status ? socketEmitter('sacEkim_' + x.schemaName + '_Insert_Result', clickData)
                        : socketEmitter('failedStatus', {});
                });
            }) : '';
        x.process.Update ?
            socket.on('sacEkim_' + x.schemaName + '_Update', (data) => {
                (x.manager).Update(data, 'sacEkim_' + x.schemaName + '_Update', (clickData) => {
                    clickData.status ? socketEmitter('sacEkim_' + x.schemaName + '_Update_Result', clickData)
                        : socketEmitter('failedStatus', {});
                });
            }) : '';
        x.process.Get ?
            socket.on('sacEkim_' + x.schemaName + '_Get', (data) => {
                (x.manager).Get(data, 'sacEkim_' + x.schemaName + '_Get', (clickData) => {
                    clickData.status ? socketEmitter('sacEkim_' + x.schemaName + '_Get_Result', clickData)
                        : socketEmitter('failedStatus', {});
                });
            }) : '';
    });
});
// SOCKET REQUESTS END //

http.listen(env.PORT, () => {
    console.log('Sunucu istekleri ' + env.PORT + ' üzerinden dinleniyor');
});