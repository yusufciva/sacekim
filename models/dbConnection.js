const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://yusuf:1234@localhost:27017/sacEkim?authSource=admin', { autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true, });
var db = mongoose.connection;
db.on('error', () => {
    console.log('MongoDB Connection error!')
});
db.once('open', () => {
    console.log('MongoDB Connection Successfull.')
});