var cheeriop = require('../promise/cheerio.js');
var promise = require('promise-polyfill');

module.exports = function(html, amt) {
	return new promise(function(resolve, reject) {
		cheeriop(html).then(function($) {
			var photos = [];
			var pics = $('#photo_grid .item');
			var picsToShow = Math.min(amt, pics.length);
			if (picsToShow == 1) {
				resolve("https://pixabay.com" + $('#photo_grid .item').children().find('img').eq(0).attr('src'));
				return;
			}

			for (var i = 0; i < picsToShow; i++) {
				photos.push("https://pixabay.com" + $('#photo_grid .item').children().find('img').eq(i).attr('src'));
			}
			if (photos.length > 0) {
				resolve(photos);
			} else {
				reject("I looked around everywhere and couldn't find any");
			}
		}).catch(function(error) { 
			console.log(error);
			reject(error); 
		})
	});
}
