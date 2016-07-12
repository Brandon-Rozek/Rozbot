var fsStat = require('../promise/fs-stat.js');

module.exports = function(file) {
	return fsStat(file).then(function(stats) {
		return stats.mtime;
	})
}
