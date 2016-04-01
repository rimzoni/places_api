var express = require('express');

var app = express();

var placesRouter = express.Router();

placesRouter.route('/Places')
		.get(function(req,res){
			var responseJson = {place: "Places api"};
			res.json(responseJson);
		});

app.use('/api',placesRouter);

app.use('/', function(req,res){
	res.send('Welcome to my API!');
});

app.listen(8020, function(){
	console.log('Gulp is listening on port 8020');
});
