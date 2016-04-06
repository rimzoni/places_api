var express = require('express');

var routes = function(Place){

  var placesRouter = express.Router();

  placesRouter.route('/')
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

        if(req.query.category){
          query.category = req.query.category;
        }

        if(req.query.active){
          query.active = req.query.active;
        }

  			Place.find(query,function(err,places){
  				if(err)
  					res.status(500).send(err);
  				else
  					res.json(places);
  			})
  		});

  placesRouter.route('/:placeId')
  		.get(function(req,res){

  			Place.findById(req.params.placeId,function(err,place){
  				if(err)
  					res.status(500).send(err);
  				else
  					res.json(place);
  			})
      })
      .put(function(req,res){
        Place.findById(req.params.placeId,function(err,place){
         if(err)
           res.status(500).send(err);
         else{
           place.name = req.body.name;
           place.description = req.body.description;
           place.image = req.body.image;
           place.lat = req.body.lat;
           place.lng = req.body.lng;
           place.category = req.body.category;
           place.active = req.body.active;


           place.save();
           res.json(place);
         }
       })
      });
return placesRouter;
};

module.exports = routes;
