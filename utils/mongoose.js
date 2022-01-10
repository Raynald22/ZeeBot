const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            //reconnectTries: Number.MAX_VALUE,
            //reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        //

        mongoose.connect('mongodb+srv://raynald22:mardiani22@cluster0.ibry2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('\nMongoose has successfully connected!'.brightGreen);
        });

        mongoose.connection.on('err', err => {
            console.error(`\nMongoose connection error: \n${err.stack}`.brightRed);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('\nMongoose connection lost'.brightYellow);
        });
    }
}