const jwt = require('jsonwebtoken');

const verify = (data, callback) => {
    jwt.verify(data, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            callback({ status: false });//Jwt çözülemedi hata var
        }
        else {
            callback({ status: true, data: decoded });
        };
    });
};
const create = (data, callback) => {
    let secret = process.env.JWT_SECRET_KEY;
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