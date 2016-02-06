var test = require('tape');  // library for test with TAP standart
var tvmaze = require('../');

test('should create a client', function(t){  // t = test object
    t.ok(tvmaze.createClient, 'should exist object');
    t.equals(typeof tvmaze.createClient, 'function', 'should be a function');
    t.end();
});