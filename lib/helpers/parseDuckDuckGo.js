var cheerio = require('../promise/cheerio.js');
var promise = require('promise-polyfill');

module.exports = function(html) {
	return new promise(function(resolve, reject) {
		cheerio(html).then(function($) {
			var results = []
			var resultsContainer = $('.result__url');
			var resultsToShow = Math.min(5, resultsContainer.length - 1);
			for (var i = 0; i < resultsToShow; i++) {
				results.push(resultsContainer.eq(i).text())
			}
			if (results.length > 0) {
				resolve(results);
			} else {
				reject("No results were found. [DuckDuckGo]")
			}
		}).catch(function(error) { 
			reject(error); 
		});
	});
}
