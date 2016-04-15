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
  		.get(placeController.getPlaceId)
      .put(placeController.putPlaceId)
      .patch(placeController.patchPlaceId)
      .delete(placeController.deletePlaceId);
       return placesRouter;
};

module.exports = routes;
