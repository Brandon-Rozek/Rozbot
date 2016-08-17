var Command = require('./Command.js');
var grabTokens = require('../helpers/grabTokens.js');
var read = require('node-readability');
var validUrl = require('valid-url')

var condition = function(text) {
	var tokens = grabTokens(text);
	return tokens.contain('extract');
}

module.exports = new Command("ExtractArticle", condition, function(text, send, userData) {
	var tokens = grabTokens(text);
	var url = tokens.find(function(element, index, array) {
		if (validUrl.isUri(element)) {
			return true;		
		}
		return false;
	});
	if (url == undefined) {
		return;
	}
	read(url, function(err, article, meta) {
		send(article.textBody);
		article.close()
	})
});
