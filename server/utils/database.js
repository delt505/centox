// imports
const {MongoClient} = require('mongodb');

// Module Export
module.exports = (username, password, host, port, cb) => {
    var databaseHost = `${host}:${port}`
    var connectOptions = (username != '' && encodeURIComponent(password) != '') ? `${username}:${encodeURIComponent(password)}@${databaseHost}` : databaseHost;

    MongoClient.connect(`mongodb+srv://client:54vsbhwWA2a6hWmB@staffdatab.pk9auka.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        cb(err, client)
    });
}
