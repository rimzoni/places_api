var should = require('should');
    sinon  = require('sinon');

describe('Place Controller tests:', function(){
    describe('Post', function(){
      it('should not allow empty name on post', function(){
        var Place = function(place){
          this.save=function(){}
        };

        var req = {
          body : {
            description : 'Best place in town'
          }
        }

        var res = {
          status : sinon.spy(),
          send   : sinon.spy()
        }

        var placeController = require('../controllers/placeController')(Place);
        placeController.post(req,res);

        res.status.calledWith(400).should.equal(true, 'Bad status' + res.status.args[0][0]);
        res.send.calledWith('Name is required').should.equal(true);
      })
    })
});
