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
  		.get(filterController.getFilterId)
      .put(filterController.putFilterId)
      .patch(filterController.patchFilterId)
      .delete(filterController.deleteFilterId);

      return filterRouter;
};

module.exports = routes;
