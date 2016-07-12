var promise = require('promise-polyfill');
var feed = require('../promise/feed.js');

module.exports = function(feedURL) {
	return new promise(function(resolve, reject) {
		feed(feedURL).then(function(articles) {
			var titles = [];
			var length = Math.min(5, articles.length);
			for (var i = 0; i < length; i++) {
				titles.push(articles[i].title + " " + articles[i].link);
			}
			if (titles.length > 0) {
				resolve(titles);
			} else {
				reject("There are no updates");
			}
		}).catch(function(error) {
			console.log(error);
			reject("I couldn't parse the feed :(");
		})
	});
}
