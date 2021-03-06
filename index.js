
var express = require('express');
var Feed = require('rss-to-json');
var app = express();

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.get('/list', (req, res) => {
	var username = req.param('username');

	if (!username) {
		res.json({
    		status: 'error',
    		message: 'missing username param'
    	});
    	return;
	}

	Feed.load('https://medium.com/feed/@' + username, function(err, rss){
	    if (err) {
	    	res.json({
	    		status: 'error',
	    		message: err
	    	});
	    	return;
	    }

	    if (!rss.items) {
		    res.json({
	    		status: 'success',
	    		message: 'no posts'
	    	});
  			return;
	    }

	    res.json({
	    	status: 'success',
	    	data: rss.items
	    });
	});
});
app.listen(3000);
console.log("Runnign on port", 3000);
