var cheerio = require('cheerio').load;
var promise = require('promise-polyfill');
module.exports = function(html) {
	return new promise(function(resolve, reject) {
        	resolve(cheerio(html));
	});
}
