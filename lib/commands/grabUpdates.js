var Command = require('./Command.js');
var grabURL = require('../helpers/grabURL.js');
var grabFeedURL = require('../helpers/grabFeedURL.js');
var grabTitles = require('../helpers/grabTitles.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	//needs to have the word update and a URL
	return tokens.superContain("update") && tokens.slice(tokens.superContainAt("update") + 1).filter(function(item) {
				return item.contains('.');
		}).length > 0
}
module.exports = new Command("Feed", condition, function(text, send, userData) {
	var tokens = grabTokens(text);
	var urls = tokens.slice(tokens.superContainAt("update") + 1).filter(function(item) {
		return item.contains('.');
	});
	send("One second and I'll go check!");
	urls.forEach(function(element) {
		console.log(element);
		return grabURL(element).then(function(res) {
			return grabFeedURL(res.meta.finalUrl, res.body.toString());
		}).then(function(feedURL) {
			return grabTitles(feedURL);
		}).then(function(titles) {
			send("The latest 5 articles from " + element + " :\n" + titles.join("\n"));
		}).catch(function(error) {
			send(error);
		})
	});
})
