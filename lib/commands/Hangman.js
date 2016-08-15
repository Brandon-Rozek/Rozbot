var Command = require('./Command.js');
var fetch = require('../promise/fetch.js');
var cheeriop = require('../promise/cheerio.js');
var promise = require('promise-polyfill');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text, userData) {
	var tokens = grabTokens(text);
	return tokens.contain('play') && tokens.contain('hangman')  && (tokens.contain("rozbot") || userData.privateMessage);
}
module.exports = new Command("Hangman", condition, function(text, send, userData) {
	var GUESSES_ALLOWED = 7;

	//Lets get a random word!
	send("I'm thinking of a word...");

	//Grabs headline of random page
	var grabHeadline = function(html) {
		return new promise(function(resolve, reject) {
			cheeriop(html).then(function($) { 
				var response = $('#headword').text().trim()
				if (response) {
					resolve(response);
				} else {
					reject("");
				}			
			}).catch(function(error) {
				console.log(error);
				reject("");
			})
		});
	}

	//Recursive guessing letters until person loses or wins
	var guessLetter = function() {
		var correctLetters = userData.getProperty("correctLetters");
		var guessedLetters = userData.getProperty("guessedLetters");
		var word = userData.getProperty("word");
		var numOfUniqueLetters = userData.getProperty("numOfUniqueLetters");
		
		if (correctLetters.length === numOfUniqueLetters) {
			send("You win!!");
			return;
		}
		if (guessedLetters.length - correctLetters.length > GUESSES_ALLOWED) {
			send("You lose...");
			send("The word was " + word);
			return;
		}

		return new promise(function(resolve, reject) {
				userData.prompt("Guess a letter").then(function(letter) {
					if (letter.length != 1) {
						send("You can only guess one letter at a time");
					} else {
						if (guessedLetters.indexOf(letter) !== -1) {
							send("You already guessed this letter");
						} else {
							if (word.indexOf(letter) !== -1) {
								send("The letter is in the word!");
								correctLetters.push(letter);
							} else {
								send("The letter is not in the word..");
							}

							//Push letter to lettersGuessed array and send the part of the word guessed so far.
							guessedLetters.push(letter);
							send(revealKnownCharacters(word, correctLetters));
						}
					}
					return;
			}).then(function() { resolve(guessLetter()) }).catch(function(e) { console.log(e); reject(e); });
		});
	}
	
	//Shows player word with __ and known letters
	var revealKnownCharacters = function(word, lettersArray) {
		return word.split('').map(function(item) {
			return (lettersArray.indexOf(item) !== -1)? item: "_";
		}).join('');
	}

	//Counts the number of unique letters in a word
	var countUniqueLetters = function(word) {
		var letters = [];
		for (var i = 0; i < word.length; i++) {
			if (letters.indexOf(word[i]) === -1) {
				letters.push(word[i]);
			}
		}
		return letters.length;
	}

	//Grab a random word from wordnik and start the game
	fetch("https://wordnik.com/randoml", {rejectUnauthorized: false}).then(function(res) {
		origin = res.meta.finalUrl;
		return grabHeadline(res.body.toString());
	}).then(function(word) {
		send("The word is " + word.length + " letters long");
		
		//Setup game variables			
		userData.setProperty("word", word);
		userData.setProperty("numOfUniqueLetters", countUniqueLetters(word));
		userData.setProperty("correctLetters", []);
		userData.setProperty("guessedLetters", []);
		
		//start
		guessLetter();
	}).catch(function(error) {
		send(error);
	});
});
