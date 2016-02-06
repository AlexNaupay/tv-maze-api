var Client = require('./lib/Client');

function createClient(){
    return new Client();
}


module.exports = {
    createClient : createClient
};