var reviewController = function(Review){

  var post = function(req,res){
    var review = new Review(req.body);

    if(!req.body.review){
      res.status(400);
      res.send('Review is required');
    }
    else{
      review.save();
      res.status(201);
      res.send(review);
    }
  }

  var get = function(req,res){

    var query = {};
    if(req.query.review){
      query.review = req.query.review;
    }

    if(req.query.userId){
      query.userId = req.query.userId;
    }

    if(req.query.numberOfStars){
      query.numberOfStars = req.query.numberOfStars;
    }

    if(req.query.placeId){
      query.placeId = req.query.placeId;
    }

    Review.find(query,function(err,reviews){
      if(err)
        res.status(500).send(err);
      else
        var returnReview =[];

        reviews.forEach(function(element,index,array){
          var newReview = element.toJSON();
          newReview.links = {};
          newReview.links.self = 'http://' + req.headers.host + '/api/reviews/' + newReview._id;
          returnReview.push(newReview);
        });

        res.json(returnReview);
    });
  }

  var getReviewId = function(req,res){

    var returnReview = req.review.toJSON();

    returnReview.links = {};

    var reviewLink = 'http://' + req.headers.host + '/api/reviews/?review=' + returnReview.review;
    var userIdLink = 'http://' + req.headers.host + '/api/reviews/?userId=' + returnReview.userId;
    var numberOfStarsLink = 'http://' + req.headers.host + '/api/reviews/?numberOfStars=' + returnReview.numberOfStars;
    var placeIdLink = 'http://' + req.headers.host + '/api/reviews/?placeId=' + returnReview.placeId;

    returnReview.links.reviewByReview = reviewLink.replace(' ','%20');
    returnReview.links.reviewByUserId = userIdLink.replace(' ','%20');
    returnReview.links.reviewByNumbersOfStars = numberOfStarsLink.replace(' ','%20');
    returnReview.links.reviewByPlaceId = placeIdLink.replace(' ','%20');

    res.json(returnReview);
  }

  var putReviewId = function(req,res){
     req.review.userId = req.body.userId;
     req.review.review = req.body.review;
     req.review.numberOfStars = req.body.numberOfStars;
     req.review.placeId = req.body.placeId;
     req.review.created = req.body.created;

     req.review.save(function(err){
       if(err)
         res.status(500).send(err);
       else{
         res.json(req.review);
       }
     });
   }

   var patchReviewId = function(req,res){
      if(req.body._id)
       delete req.body._id;

      for(var p in req.body){
        req.review[p] = req.body[p];
      }

      req.review.save(function(err){
        if(err)
          res.status(500).send(err);
        else{
          res.json(req.review);
        }
      });
    }

    var deleteReviewId = function(req,res){
      req.review.remove(function(err){
        if(err)
          res.status(500).send(err);
        else{
          res.status(204).send("Review removed.");
        }
      });
     }

  return {
    post : post,
    get  : get,
    getReviewId : getReviewId,
    putReviewId : putReviewId,
    patchReviewId : patchReviewId,
    deleteReviewId : deleteReviewId
  }
};

module.exports =reviewController;
