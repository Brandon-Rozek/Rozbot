var fs = require('fs');
var promise = require('promise-polyfill');

module.exports = function(path) {
	return new promise(function(resolve, reject) {
		resolve(fs.stat(path));
	});
}
