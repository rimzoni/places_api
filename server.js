var express = require('express');

var app = express();

app.use('/', function(req,res){
	res.send('Welcome to my API!');
});

app.listen(8020, function(){
	console.log('Gulp is listening on port 8020');
});
