# tv-maze-api

## Usage

```js
var tvmaze = require('tv-maze-api')

var client = tvmaze.createClient()

client.shows(function (err, shows){
	// do something shows ..
})

client.search('lost', function(err, shows){
	// do something shows
})
```
