var mongoose = require('mongoose');
    Schema = mongoose.Schema;


var userModel = new Schema({
    username :{type: String},
    token : {type: String},
    email:{type:String},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userModel);
