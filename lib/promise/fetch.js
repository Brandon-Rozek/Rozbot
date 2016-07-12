var fetch = require('fetch').fetchUrl;
var promise = require('promise-polyfill');
module.exports = function(link, options) {
	return new promise(function(resolve, reject) {
		fetch(link, options, function(error, meta, body) {
			if (error) {
				reject(error);
			} else {
				resolve({meta: meta, body: body});
			}
		});
	});
}
