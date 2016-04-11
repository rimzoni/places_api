var filterController = function(Filter){

  var post = function(req,res){
    var filter = new Filter(req.body);

    if(!req.body.name){
      res.status(400);
      res.send('Name is required');
    }
    else{
      filter.save();
      res.status(201);
      res.send(filter);
    }
  }

  var get = function(req,res){

    var query = {};
    if(req.query.name){
      query.name = req.query.name;
    }

    if(req.query.description){
      query.description = req.query.description;
    }

    if(req.query.active){
      query.active = req.query.active;
    }

    Filter.find(query,function(err,filters){
      if(err)
        res.status(500).send(err);
      else
        res.json(filters);
    });
  }

  return {
    post : post,
    get  : get
  }
};

module.exports =filterController;
