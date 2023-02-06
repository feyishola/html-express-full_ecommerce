const mongoose = require('mongoose');

module.exports = async () => {
    let dbCon = mongoose.connection;
    dbCon
        .on('connected', () => {
            console.log('Connected to mongo!');
        })
        .on('error', (err) => {
            console.log('There is an error from mongodb : >> ', err.message);
        })
        .on('disconnected', () => {
            setTimeout(async () => {
                await mongoose.connect('mongodb://mongodb:27017/ecommerce');
            }, 5000)
        });

    await mongoose.connect('mongodb://mongodb:27017/ecommerce')
}
