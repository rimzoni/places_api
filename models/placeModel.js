var mongoose = require('mongoose');
    Schema = mongoose.Schema;


var placeModel = new Schema({
    name :{type: String},
    description:{type:String},
    category:{type:String}
});


module.exports = mongoose.model('Place', placeModel);
