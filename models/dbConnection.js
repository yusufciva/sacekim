const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let env = process.env;
mongoose.connect('mongodb://' + env.MONGODB_USERNAME + ':' + env.MONGODB_PASSWORD + '@' + env.MONGODB_HOST + ':27017/' + env.MONGODB_DB + '?authSource=admin', { autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true, });
var db = mongoose.connection;
db.on('error', () => {
    console.log('MongoDB Connection error!')
});
db.once('open', () => {
    console.log('MongoDB Connection Successfull.')
});