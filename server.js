var express = require('express');
		mongoose = require('mongoose');
		bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/placeAPI');

var Place = require('./models/placeModel');
var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

placesRouter = require('./routes/placeRoutes')(Place);


app.use('/api/places',placesRouter);

app.use('/', function(req,res){
	res.send('Welcome to my API!');
});

app.listen(8020, function(){
	console.log('Gulp is listening on port 8020');
});
