var request = require('client-request');
var qs = require('querystring');


function Client (options){
    this.options = options || {};
    this.endpoint = this.options.endpoint || 'http://api.tvmaze.com';
}

Client.prototype.shows = function(callback){
    request({
        uri: this.endpoint+'/shows',
        method: 'GET',
        json: true
    }, function(err, response, data){
        if(err)
            return callback(err);
        if(response.statusCode != 200)
            return callback(new Error('An error ocurred during the  request'));
        callback(null, data)
    })
};


Client.prototype.search = function(query, callback){
    request({
        uri: this.endpoint+'/search/shows'+'?'+ qs.stringify({q: query}),
        method: 'GET',
        json: true
    }, function(err, response, data){
        if(err)
            return callback(err);
        if(response.statusCode != 200)
            return callback(new Error('An error ocurred during the  request'));
        callback(null, data)
    })

};

module.exports = Client;