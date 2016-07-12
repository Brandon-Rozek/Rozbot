var cheeriop = require('../promise/cheerio.js');
var promise = require('promise-polyfill');

module.exports = function(html) {
	return new promise(function(resolve, reject) {
		cheeriop(html).then(function($) {
			if ($('.mw-search-nonefound').length > 0) {
				reject("");
			} else {
				resolve($('#mw-content-text').find('p').first().text());
			}
		}).catch(function(error) {
			console.log(error);
			reject("");
		})
	});
}
