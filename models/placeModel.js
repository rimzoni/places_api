var mongoose = require('mongoose');
    Schema = mongoose.Schema;


var placeModel = new Schema({
    name :{type: String},
    description:{type:String},
    image:{type:String},
    lat:{type:String},
    lng:{type:String},
    category:{type:String},
    active:{type:Boolean}
});

module.exports = mongoose.model('Place', placeModel);
