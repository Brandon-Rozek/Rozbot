var feed = require('feed-read');
var promise = require('promise-polyfill');

module.exports = function(link) {
	return new promise(function(resolve, reject) {
		feed(link, function(error, articles) {
			if (error) {
				reject(error);
			} else {
				resolve(articles);
			}
		});
	});
}
