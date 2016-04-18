var mongoose = require('mongoose');
    Schema = mongoose.Schema;


var reviewModel = new Schema({
    userId :{type: String},
    review:{type:String},
    numberOfStars:{type: Number},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewModel);
