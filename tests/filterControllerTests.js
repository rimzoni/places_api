var should = require('should');
    sinon  = require('sinon');

describe('Filter Controller tests:', function(){
    describe('Post', function(){
      it('should not allow empty name on post', function(){
        var Filter = function(filter){
          this.save=function(){}
        };

        var req = {
          body : {
            description : 'Food filter'
          }
        }

        var res = {
          status : sinon.spy(),
          send   : sinon.spy()
        }

        var filterController = require('../controllers/filterController')(Filter);
        filterController.post(req,res);

        res.status.calledWith(400).should.equal(true, 'Bad status' + res.status.args[0][0]);
        res.send.calledWith('Name is required').should.equal(true);
      })
    })
});
