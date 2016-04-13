var express = require('express');

var routes = function(Filter){

var filterRouter = express.Router();

var filterController = require('../controllers/filterController')(Filter);
  filterRouter.route('/')
  		.post(filterController.post)
  		.get(filterController.get);

  filterRouter.use('/:filterId', function(req,res,next){
    Filter.findById(req.params.filterId,function(err,filter){
      if(err)
        res.status(500).send(err);
      else if(filter){
        req.filter = filter;
        next();
      }
      else{
        res.status(404).send('Filter not found');
      }
    })
  });
  filterRouter.route('/:filterId')
  		.get(function(req,res){

        var returnFilter = req.filter.toJSON();

        returnFilter.links = {};

        var nameLink = 'http://' + req.headers.host + '/api/filters/?name=' + returnFilter.name;
        var descriptionLink = 'http://' + req.headers.host + '/api/filters/?description=' + returnFilter.description;
        var activeLink = 'http://' + req.headers.host + '/api/filters/?active=' + returnFilter.active;

        returnFilter.links.filterByName = nameLink.replace(' ','%20');
        returnFilter.links.filterByDescription = descriptionLink.replace(' ','%20');
        returnFilter.links.filterByActive = activeLink.replace(' ','%20');

        res.json(returnFilter);
      })
      .put(function(req,res){
         req.filter.name = req.body.name;
         req.filter.description = req.body.description;
         req.filter.active = req.body.active;

         req.filter.save(function(err){
           if(err)
             res.status(500).send(err);
           else{
             res.json(req.filter);
           }
         });
       })
       .patch(function(req,res){
         if(req.body._id)
          delete req.body._id;

         for(var p in req.body){
           req.filter[p] = req.body[p];
         }

         req.filter.save(function(err){
           if(err)
             res.status(500).send(err);
           else{
             res.json(req.filter);
           }
         });
       })
       .delete(function(req,res){
        req.filter.remove(function(err){
          if(err)
            res.status(500).send(err);
          else{
            res.status(204).send("Filter removed.");
          }
        });
       });
       return filterRouter;
};

module.exports = routes;
