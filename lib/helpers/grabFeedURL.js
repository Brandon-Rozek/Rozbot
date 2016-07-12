var promise = require('promise-polyfill');
var cheerio = require('../promise/cheerio.js');
var url = require('url');

module.exports = function(origin, html) {
	return new promise(function(resolve, reject) {
		cheerio(html).then(function($) {
			var link = $('link[rel=alternate]').attr('href');
			if (link) {
				var feedURL = url.parse(link, true, true);
				if (feedURL.hostname === null) {
					feedURL = url.parse(url.resolve(origin, feedURL.href), true, true)
				}
				if (feedURL.protocol === null) {
					feedURL = url.parse(url.resolve('http:', feedURL.href), true, true);
				}
				resolve(feedURL.href);
			}
			else {
				reject("I couldn't find the link >.<");
			}	
		}).catch(function(error) {
			console.log(error);
			reject("I wasn't able to find the link :/");
		})
	})
}
