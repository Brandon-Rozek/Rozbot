var Rozbot = require('./Rozbot.js');
var User = require('./User.js');

var rozbot = new Rozbot();
/*
	Order matters!!
	-Rozbot checks through all the commands until it hits one that matches
*/

rozbot.extend(require('./lib/commands/onTheRadio.js'));
getWeather = require('./lib/commands/getWeather.js');
getWeather.setId('188d435fd17dcf22261679cf64e98cd5');
rozbot.extend(getWeather);
rozbot.extend(require('./lib/commands/grabUpdates.js'));
rozbot.extend(require('./lib/commands/grabTweets.js'));
rozbot.extend(require('./lib/commands/displayTweet.js'));
rozbot.extend(require('./lib/commands/Hangman.js'));
rozbot.extend(require('./lib/commands/RockPaperScissors.js'));
rozbot.extend(require('./lib/commands/grabPictures.js'));
rozbot.extend(require('./lib/commands/grabWikipedia.js'));
rozbot.extend(require('./lib/commands/grabDefinition.js'));
rozbot.extend(require('./lib/commands/calculate.js'));
rozbot.extend(require('./lib/commands/timer.js'));
rozbot.extend(require('./lib/commands/search.js'));
rozbot.extend(require('./lib/commands/naturalSpeech.js'));
rozbot.extend(require('./lib/commands/extractArticle.js'));
rozbot.extend(require('./lib/commands/queryDuckDuckGo.js'));

rozbot.respond(process.argv[2], rozbot.getUser("Command Line") || rozbot.addUser("Command Line", function(msg) {
	console.log(msg);
}), {privateMessage: true});
