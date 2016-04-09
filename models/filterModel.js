var mongoose = require('mongoose');
    Schema = mongoose.Schema;


var filterModel = new Schema({
    name :{type: String},
    description:{type:String},
    active:{type:Boolean}
});

module.exports = mongoose.model('Filter', filterModel);
