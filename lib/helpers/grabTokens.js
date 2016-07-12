var stopWords = require('./stopWords.js');

module.exports = function(text) {
	text = text || "";
	return text.split(' ').filter(function(item) {
		return stopWords.indexOf(item) === -1;
	}).map(function(item) {
		return (item.contains("http")) ? item: item.removeAll("?", ".", ",", "!").toLowerCase();
	});
}
