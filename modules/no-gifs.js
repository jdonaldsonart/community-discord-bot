
const botConfig = require('../config/index.js');

if (!botConfig.bot.noGifChannels || botConfig.bot.noGifChannels.length == 0) {
	log({ module: 'no-gifs' }, 'no "no gifs" channels are defined');
} else {
	new Module('no-gifs', 'message', { channel: CONFIG.noGifChannels, stopOnMatch: false }, function (message) {

		const channelName = '#' + message.channel.name;
		const userName = '#' + message.author.username;

		//if there is no attachment
		if (message.attachments.size <= 0) {

			//if the message is from tenor.com
			if (/^(http|https):\/\/.*(tenor.com|giphy.com).*$/i.test(message.content)) {
				message.delete();
				message.author.send("I deleted the gif you posted in " + channelName + " because I don't allow gifs in there! I'm tough that way!");
			}

			//otherwise, delete it
			// log('deleting message in',channelName,'by',userName,'"'+message.content+'"');
			// return;
		}
	});
}
