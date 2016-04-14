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

  return {
    post : post,
    get  : get,
    getPlaceId : getPlaceId
  }
};

module.exports = placeController;
