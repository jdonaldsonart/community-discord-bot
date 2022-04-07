const botConfig = require('../config/index.js');

if (!botConfig.bot.threadFromImageChannels || botConfig.bot.threadFromImageChannels.length == 0) {
	log({ module: 'threads-from-images' }, 'no "threads-from-images" only channels are defined');
} else {
	//when a message is sent in a threadFromImageChannels channel
	new Module('threads-from-images', 'message', { channel: botConfig.bot.threadFromImageChannels }, function (message) {
		//if there is no attachment
		if (message.attachments.size <= 0) {

			//if the message was an image url, thread it
			if (/(http|https):\/\/.*\.(png|jpg|jpeg)/i.test(message.content)) {
				newThreadFromImage(message);
				return log('\timage url posted');
			}

			//if the message is an instagram, reddit or twitter url, thread it
			else if (/(http|https):\/\/(www\.)?(instagram|twitter|reddit)\.com/i.test(message.content)) {
				newThreadFromImage(message);
				return  log('\tsocial url posted');
			}	
		}

		//there are attachments
		else {
			console.log("this message has an attachment");
			
			var att = message.attachments.first();

			if (att.width && att.height) {
				newThreadFromImage(message);

				return log('\tmessage has attached images');
			}
			
		}

		console.log('posted in thread from image channel', message.interaction);


	});

	/*new Module('thread archive', 'message', {filter: /^!deletethread$/i}, function (message) {
		
	});*/
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function newThreadFromImage(message) {
	sleep(3000).then(() => {
		message.startThread({
			name: title(message.member.displayName, true) + ' ' + title(message.channel.name),
			autoArchiveDuration: 60 * 24 ,//minutes
			//reason: 'poopoo'
		}).then(newThread => {
			newThread.send('Hey! I started a thread for you! If you don\'t like it.. tough!')
				.then(botMessage => {
					setTimeout(e => {
						try {
							botMessage.delete().catch(e => console.log('failed to delete'))}
						catch (e) {console.log('failed to delete thread notice')}
					}, 1000 * 60 );
				});
		});
	});
}

function title(string, plural) {
     let newString = string.charAt(0).toUpperCase() + string.slice(1);
    
    if (plural) newString += "'";
    if (plural && string.slice(-1) !== 's') newString += "s";
  
    return newString;
}