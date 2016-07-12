var Command = require('./Command.js');
var grabURL = require('../helpers/grabURL.js');
var parseTwitter = require('../helpers/parseTwitter.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	//Text must contain the word tweets and have a handler
	return tokens.contain('tweets') && tokens.filter(function(f) { return f.indexOf("#") == 0 || f.indexOf("@") == 0}).length > 0;
}
module.exports = new Command("GetTweets", condition, function(text, send, userData) {
	var tokens = grabTokens(text);
	var handles = tokens.filter(function(f) { return f.indexOf("#") == 0 || f.indexOf("@") == 0});
	handles.forEach(function(handle) {
		var handleUrl = (handle[0] == "@")? "https://twitter.com/" + handle.substring(1): "https://twitter.com/hashtag/" + handle.substring(1);
		return grabURL(handleUrl).then(function(res) {
			return parseTwitter(res.body.toString());
		}).then(function(tweets) {
			send("The latest tweets from " + handle + ":\n" + tweets.join("\n"));
		}).catch(function(error) {
			send(error);
		});
	});
})
