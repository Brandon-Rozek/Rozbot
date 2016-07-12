var fs = require('fs');
var promise = require('promise-polyfill');

module.exports = function(file, data) {
	return new promise(function(resolve, reject) {
		fs.appendFile(file, data + "\n", function(error) {
			if (error) {
				console.log(error);
				//reject(error);
			}
		});
	});
}
