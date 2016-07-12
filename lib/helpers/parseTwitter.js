var cheerio = require('../promise/cheerio.js');
var promise = require('promise-polyfill');

module.exports = function(html) {
	return new promise(function(resolve, reject) {
		cheerio(html).then(function($) {
			var tweets = [];
			var tweetsContainer = $('.tweet');
			var tweetsToShow = Math.min(5, tweetsContainer.length - 1);
			for (var i = 0; i < tweetsToShow; i++) {
				tweets.push($('.tweet').children().find('.fullname').eq(i).text() + " (" + $('.tweet').children().find('.username').eq(i).text() + ")" + ": " + $('.tweet').children().find('.tweet-text').eq(i).text())
			}
			if (tweets.length > 0) {
				resolve(tweets);
			} else {
				reject("No tweets were found.")
			}
		}).catch(function(error) { 
			reject(error); 
		});
	});
}
