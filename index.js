
var express = require('express');
var Feed = require('rss-to-json');
var app = express();

app.get('/list', (req, res) => {
	Feed.load('https://medium.com/feed/@marcoshmendes', function(err, rss){
	    if (err) {
	    	res.json({
	    		status: 'error',
	    		err: err
	    	});
	    	return;
	    }

	    if (!rss.items) {
	    	return;
	    }

	    res.json({
	    	status: 'success',
	    	data: rss.itens
	    });
	});
});
app.listen(3000);
console.log("Runnign on port", 3000);