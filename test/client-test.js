var test = require('tape');  // library for test with TAP standart
var tvmaze = require('../');
var Client = require('../lib/client');

var nock = require('nock');

var ENDPOINT_TEST = 'http://tvmaze.test';  // base url for testcases

test('should create a client', function(t){  // t = test object
    t.ok(tvmaze.createClient, 'should exist object');
    t.equals(typeof tvmaze.createClient, 'function', 'should be a function');

    var client = tvmaze.createClient();

    t.ok(client instanceof Client, 'should be a instance of Client');
    t.end();
});

test('should retrieve a list shows', function(t){
    var client = tvmaze.createClient({endpoint: ENDPOINT_TEST});
    t.equals(typeof client.shows, 'function', 'should be a function');

    nock(ENDPOINT_TEST)
        .get('/shows')
        .reply(200, []);

    client.shows(function(err, shows){
        console.log(shows);
        t.error(err, 'should not be an error');
        t.ok(Array.isArray(shows), 'should be an array');
        t.end();
    });
});


test('should retrieve a list shows when search shows', function(t){
    var client = tvmaze.createClient({endpoint: ENDPOINT_TEST});
    t.ok(typeof client.search, 'function', 'should be a function object');

    nock(ENDPOINT_TEST)
        .get('/search/shows')
        .query({q: 'dragon ball'})
        .reply(200, [{name:'dragon ball super'}, {}, {}, {}]);

    client.search('dragon ball', function(err, shows){
        t.error(err, 'should not be an error');
        t.ok(Array.isArray(shows), 'should be an array');
        t.ok(shows[0].name, 'dragon ball super', 'should retrieve a show name');
        t.equal(shows.length, 4, 'should be length 4');
        t.end();
    });

});

test('should retrieve a show', function(t){
    var client = tvmaze.createClient({endpoint: ENDPOINT_TEST});
    var id = 15;

    t.ok(typeof client.show, 'function', 'should be a function object');

    nock(ENDPOINT_TEST)
        .get('/shows/'+id)
        .reply(200, {id: 5, name:'alexh'});

    client.show(id, function(err, show){
        t.error(err, 'should not be an error');
        t.ok(typeof show, 'object', 'should be an object');
        t.ok(show.id, id, 'should retrieve an object with id: '+id);
        t.ok(show.name, 'alexh', 'should retrieve an object with name: alexh');
        t.end();
    });

});
