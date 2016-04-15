var placeController = function(Place){

  var post = function(req,res){
    var place = new Place(req.body);

    if(!req.body.name){
      res.status(400);
      res.send('Name is required');
    }
    else{
      place.save();
      res.status(201);
      res.send(place);
    }
  }

  var get = function(req,res){

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
      else{
        var returnPlace =[];

        places.forEach(function(element,index,array){
          var newPlace = element.toJSON();
          newPlace.links = {};
          newPlace.links.self = 'http://' + req.headers.host + '/api/places/' + newPlace._id;
          returnPlace.push(newPlace);
        });

        res.json(returnPlace);
      }
    });
  }

  var getPlaceId = function(req,res){

    var returnPlace = req.place.toJSON();

    returnPlace.links = {};

    var nameLink = 'http://' + req.headers.host + '/api/places/?name=' + returnPlace.name;
    var categoryLink = 'http://' + req.headers.host + '/api/places/?category=' + returnPlace.category;
    var activeLink = 'http://' + req.headers.host + '/api/places/?active=' + returnPlace.active;

    returnPlace.links.filterByName = nameLink.replace(' ','%20');
    returnPlace.links.filterByCategory = categoryLink.replace(' ','%20');
    returnPlace.links.filterByActive = activeLink.replace(' ','%20');

    res.json(returnPlace);
  }

  var putPlaceId = function(req,res){
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
   }

   var patchPlaceId = function(req,res){
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
    }

  var deletePlaceId = function(req,res){
    req.place.remove(function(err){
      if(err)
        res.status(500).send(err);
      else{
        res.status(204).send("Place removed.");
      }
    });
   }

  return {
    post : post,
    get  : get,
    getPlaceId : getPlaceId,
    putPlaceId : putPlaceId,
    patchPlaceId : patchPlaceId,
    deletePlaceId : deletePlaceId
  }
};

module.exports = placeController;
