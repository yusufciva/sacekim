const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/sacEkim', { autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true, });
var db = mongoose.connection;
db.on('error', () => {
    console.log('MongoDB Connection error!')
});
db.once('open', () => {
    console.log('MongoDB Connection Successfull.')
});