var express = require('express');

var routes = function(Review){

var reviewRouter = express.Router();

var reviewController = require('../controllers/reviewController')(Review);
  reviewRouter.route('/')
  		.post(reviewController.post)
  		.get(reviewController.get);

  reviewRouter.use('/:reviewId', function(req,res,next){
    Review.findById(req.params.reviewId,function(err,review){
      if(err)
        res.status(500).send(err);
      else if(review){
        req.review = review;
        next();
      }
      else{
        res.status(404).send('Review not found');
      }
    })
  });
  reviewRouter.route('/:reviewId')
  		.get(reviewController.getReviewId)
      .put(reviewController.putReviewId)
      .patch(reviewController.patchReviewId)
      .delete(reviewController.deleteReviewId);

      return reviewRouter;
};

module.exports = routes;
