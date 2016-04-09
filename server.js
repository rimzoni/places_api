var express = require('express');
		mongoose = require('mongoose');
		bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/placeAPI');

var Place = require('./models/placeModel');
var Filter = require('./models/filterModel');

var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

placesRouter = require('./routes/placeRoutes')(Place);
filterRouter = require('./routes/filterRoutes')(Filter);


app.use('/api/places',placesRouter);
app.use('/api/filters',filterRouter);

app.use('/', function(req,res){
	res.send('Welcome to places API!');
});

app.listen(8020, function(){
	console.log('Gulp is listening on port 8020');
});
