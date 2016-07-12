var Command = require('./Command.js');
var grabURL = require('../helpers/grabURL.js');
var parseTwitter = require('../helpers/parseTwitter.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	return tokens.filter(function(item) {
		return item.contains("twitter.com") && item.contains("/status/")
	}).length > 0;
}
module.exports = new Command("DisplayTweet", condition, function(text, send, userData) {
	var tokens = grabTokens(text);
	var status = tokens.filter(function(item) {
		return item.contains("twitter.com") && item.contains("/status/")
	});
	status.forEach(function(item) {
		grabURL(item + '?').then(function(response) {
			return parseTwitter(response.body.toString());
		}).then(function(tweet) {
			send(tweet);
		}).catch(function(error) {
			console.log(error);
		});
	});
})
