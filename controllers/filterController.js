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
        var returnFilter =[];

        filters.forEach(function(element,index,array){
          var newFilter = element.toJSON();
          newFilter.links = {};
          newFilter.links.self = 'http://' + req.headers.host + '/api/filters/' + newFilter._id;
          returnFilter.push(newFilter);
        });

        res.json(returnFilter);
    });
  }

  var getFilterId = function(req,res){

    var returnFilter = req.filter.toJSON();

    returnFilter.links = {};

    var nameLink = 'http://' + req.headers.host + '/api/filters/?name=' + returnFilter.name;
    var descriptionLink = 'http://' + req.headers.host + '/api/filters/?description=' + returnFilter.description;
    var activeLink = 'http://' + req.headers.host + '/api/filters/?active=' + returnFilter.active;

    returnFilter.links.filterByName = nameLink.replace(' ','%20');
    returnFilter.links.filterByDescription = descriptionLink.replace(' ','%20');
    returnFilter.links.filterByActive = activeLink.replace(' ','%20');

    res.json(returnFilter);
  }

  return {
    post : post,
    get  : get,
    getFilterId : getFilterId
  }
};

module.exports =filterController;
