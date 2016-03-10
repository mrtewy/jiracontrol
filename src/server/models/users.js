// grab the mongoose module
var mongoose = require('mongoose');

module.exports = mongoose.model('UsersDatabase', {
	name: String,
    description : String,
    start_date : Date
});