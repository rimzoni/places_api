var express = require('express');
		mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/placeAPI');

var Place = require('./models/placeModel');
var app = express();

var placesRouter = express.Router();

placesRouter.route('/Places')
		.get(function(req,res){
			Place.find(function(err,places){
				if(err)
					res.status(500).send(err);
				else
					res.json(places);
			})
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
