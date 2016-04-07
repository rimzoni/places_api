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

  placesRouter.use('/:placeId', function(req,res,next){
    Place.findById(req.params.placeId,function(err,place){
      if(err)
        res.status(500).send(err);
      else if(place){
        req.place = place;
        next();
      }
      else{
        res.status(404).send('Place not found');
      }
    })
  });
  placesRouter.route('/:placeId')
  		.get(function(req,res){
        res.json(req.place);
      })
      .put(function(req,res){
         req.place.name = req.body.name;
         req.place.description = req.body.description;
         req.place.image = req.body.image;
         req.place.lat = req.body.lat;
         req.place.lng = req.body.lng;
         req.place.category = req.body.category;
         req.place.active = req.body.active;

         req.place.save();
         res.json(req.place);
       });
       return placesRouter;
};

module.exports = routes;
