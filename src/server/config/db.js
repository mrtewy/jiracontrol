module.exports = function(mongoose){
	'use strict';
 	mongoose.connect('mongodb://admin:admin@ds059165.mlab.com:59165/sdu');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('connected');
	});
};
