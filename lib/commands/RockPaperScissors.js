var Command = require('./Command.js');
var grabTokens = require('../helpers/grabTokens.js');
var promise = require('promise-polyfill');

var condition = function(text) {
	var tokens = grabTokens(text);
	return tokens.contain("play") && (tokens.contain("rock") && tokens.contain("paper") && tokens.contain("scissors"))
}

module.exports = new Command("RockPaperScissors", condition, function(text, send, userData) {
	userData.prompt("Make your move").then(function(choice) {
		choice = choice.toLowerCase();

		var options = ["rock", "paper", "scissors"]

		//If player doesn't choice rock, paper, or scissors
		if (options.indexOf(choice) === -1) {
			send("Aw you tricked me, that wasn't an option");
			return
		}
		
		var computerChoice = options[Math.floor(Math.random() * options.length)];

		send("I chose " + computerChoice);
	
		//Game logic
		if (choice === "rock") {
			if (computerChoice === "rock") {
				send("It's a tie..");
			} else if (computerChoice === "paper") {
				send("You lose..");
			} else if (computerChoice === "scissors") {
				send("You win!");
			}
		} else if (choice === "paper") {
			if (computerChoice === "rock") {
				send("You win!");
			} else if (computerChoice === "paper") {
				send("It's a tie..");
			} else if (computerChoice === "scissors") {
				send("You lose..");
			}
		} else if (choice === "scissors") {
			if (computerChoice === "rock") {
				send("You lose..");
			} else if (computerChoice === "paper") {
				send("You win!");
			} else if (computerChoice === "scissors") {
				send("It's a tie..");
			}
		}

	});
});
