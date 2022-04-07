const greetings = ['Hey!', 'Hi!', 'Yo', 'Hello', '\'sup', 'Hellloooooo!', 'Hidey-ho!', 'Heya!', 'Ahoy!', 'Hey, how\'s it goin\'?', '<:soup:713879618746318959>'];

new Module('hello', 'message', {filter: /\b(hello|hi|sup|how|yo|hey|soup|howdy|<:soup:713879618746318959>|g'day|morning|mornin'|ahoy|oi|buenos dias|hoi|hallo|hola|bonjour|guten tag|yasou|shalom|namast|jo napot|salve|konnichiwa|salam|ola)\b/i, pingBot: true}, function (message) {
	message.channel.send(pickRandom(greetings));
});

new Module('sustin', 'message', {filter: /\b(sustin)\b/i, pingBot: false}, function (message) {
	react(message,pickRandom(['SUS','sussy','sussiest']));
});

new Module('mean', 'message', {filter: /\b(bad|badbot|stupid|ugly|dumb|idiot|moron|butt|poop|worst)\b/i, pingBot: true}, function (message) {
	react(message,pickRandom(['SUS','sussy','sussiest']));
});

new Module('sentient', 'message', {filter: /\b(real|alive|conscious|aware|sentient)\b/i, pingBot: true}, function (message) {
	react(message,'sussiest');
});

/*global Module, CONFIG, client, log, error, send, react, sendEmoji, pickRandom, messageHasBotPing, isMod */