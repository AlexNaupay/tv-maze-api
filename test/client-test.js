var test = require('tape');  // library for test with TAP standart
var tvmaze = require('../');
var Client = require('../lib/client');

test('should create a client', function(t){  // t = test object
    t.ok(tvmaze.createClient, 'should exist object');
    t.equals(typeof tvmaze.createClient, 'function', 'should be a function');

    var client = tvmaze.createClient();

    t.ok(client instanceof Client, 'should be a instance of Client');
    t.end();
});

test('should retrieve a list shows', function(t){
    var client = tvmaze.createClient();
    t.equals(typeof client.shows, 'function', 'should be a function');
    t.end();
});