var cheeriop = require('../promise/cheerio.js');
var promise = require('promise-polyfill');

module.exports = function(html) {
	return new promise(function(resolve, reject) {
		cheeriop(html).then(function($) { 
			var response = $('#define').children().find('ul').children().first().text()
			if (response) {
				resolve(response);
			} else {
				reject("");
			}			
		}).catch(function(error) {
			console.log(error);
			reject("");
		})
	});
}
