var request = require('client-request');
var qs = require('querystring');


function Client (options){
    this.options = options || {};
    this.endpoint = this.options.endpoint || 'http://api.tvmaze.com';
}

Client.prototype._request = function(method, path, params, callback){
    var uri = this.endpoint + path;
    if (params) {
        uri = uri + '?' + qs.stringify(params);
    }

    request({
        uri: uri,
        method: method || 'GET',
        json: true
    }, function(err, response, data){
        if (err)
            return callback(err);
        if (response.statusCode !== 200)
            return callback(new Error('An error ocurred during request'));
        callback(err, data);
    });
};

Client.prototype.shows = function(callback){
    this._request('GET', '/shows', null, callback);
};


Client.prototype.search = function(query, callback){
    this._request('GET', '/search/shows', {q: query}, callback);
};

Client.prototype.show = function(id, callback){
    this._request('GET', '/shows/'+id, null, callback);
};

module.exports = Client;