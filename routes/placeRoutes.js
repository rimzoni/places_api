var express = require('express');

var routes = function(Place){

var placesRouter = express.Router();

var placeController = require('../controllers/placeController')(Place);
  placesRouter.route('/')
  		.post(placeController.post)
  		.get(placeController.get);

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

         req.place.save(function(err){
           if(err)
             res.status(500).send(err);
           else{
             res.json(req.place);
           }
         });
       })
       .patch(function(req,res){
         if(req.body._id)
          delete req.body._id;

         for(var p in req.body){
           req.place[p] = req.body[p];
         }

         req.place.save(function(err){
           if(err)
             res.status(500).send(err);
           else{
             res.json(req.place);
           }
         });
       })
       .delete(function(req,res){
        req.place.remove(function(err){
          if(err)
            res.status(500).send(err);
          else{
            res.status(204).send("Place removed.");
          }
        });
       });
       return placesRouter;
};

module.exports = routes;
