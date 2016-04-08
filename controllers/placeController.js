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
      else
        res.json(places);
    });
  }

  return {
    post : post,
    get  : get
  }
};

module.exports =placeController;
