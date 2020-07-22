const jwt = require('jsonwebtoken');

const verify = (data, callback) => {
    jwt.verify(data, "SacEkimi_Gizli_Ama_Gizli_Salt_Tuz_Sifre", (err, decoded) => {
        if (err) {
            callback({ status: false });//Jwt çözülemedi hata var
        }
        else {
            callback({ status: true, data: decoded });
        };
    });
};
const create = (data, callback) => {
    let secret = "SacEkimi_Gizli_Ama_Gizli_Salt_Tuz_Sifre";
    jwt.sign(data, secret, (err, token) => {
        if (!err) {
            callback(token);
        }
        else {
            callback(false);//Olaki bir hata oluşursa
        };
    });
};

module.exports = {
    verify,
    create
};