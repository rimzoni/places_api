var express = require('express');
		mongoose = require('mongoose');
		bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/placeAPI');

var Place = require('./models/placeModel');
var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
var placesRouter = express.Router();

placesRouter.route('/Places')
		.post(function(req,res){
			var place = new Place(req.body);

			place.save();

			res.status(201).send(place);
		})
		.get(function(req,res){

			var query = {};
			if(req.query.name){
				query.name = req.query.name;
			}

			Place.find(query,function(err,places){
				if(err)
					res.status(500).send(err);
				else
					res.json(places);
			})
		});

placesRouter.route('/Places/:placeId')
		.get(function(req,res){

			Place.findById(req.params.placeId,function(err,place){
				if(err)
					res.status(500).send(err);
				else
					res.json(place);
			})
		});


app.use('/api',placesRouter);

app.use('/', function(req,res){
	res.send('Welcome to my API!');
});

app.listen(8020, function(){
	console.log('Gulp is listening on port 8020');
});
