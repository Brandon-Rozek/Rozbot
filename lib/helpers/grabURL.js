var promise = require('promise-polyfill');
var url = require('url');
var fetch = require('../promise/fetch.js');

module.exports = function(websiteURL) {
	return new promise(function(resolve, reject) {
		var weburl = url.parse(websiteURL, true, true);
		if (weburl.protocol === null) {
			weburl = url.parse('http://' + websiteURL);
		}
		websiteURL = weburl.href;	
		fetch(websiteURL).then(function(res) {
			resolve({meta: res.meta, body: res.body});
		}).catch(function(error) {
			console.log(error);
			reject("Sorry, I wasn't able to grab the page.");
		});
	});
}
