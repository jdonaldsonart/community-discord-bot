
const pollIndex = [
	'đĻ','đ§','đ¨','đŠ','đĒ','đĢ','đŦ','đ­','đŽ','đ¯','đ°','đą','đ˛','đŗ','đ´','đĩ','đļ','đˇ','đ¸','đš','đē','đģ','đŧ','đŊ','đž','đŋ',
	'0ī¸âŖ','1ī¸âŖ','2ī¸âŖ','3ī¸âŖ','4ī¸âŖ','5ī¸âŖ','6ī¸âŖ','7ī¸âŖ','8ī¸âŖ','9ī¸âŖ','đ',
	'âēī¸','đŧ','âšī¸',
	'đĻ','đļ','âšī¸','#ī¸âŖ','*ī¸âŖ','đ','đ','đ','đ','âĢ','âŦ','âĒ','âŠ','â¸ī¸','âī¸',
	'đ°ī¸','đąī¸','đ','đ','đžī¸',
	'â','â','â','â','â','â','â','â','â','â','â','â','â',
	'âŽī¸','âī¸','âĒī¸','đī¸','â¸ī¸','âĄī¸','đ¯','đ','â¯ī¸','âĻī¸','đ',
	'đ','âī¸',
	'âžī¸','âī¸','â','âĸī¸','đŗ','đ´','đŖī¸','đī¸','đ','đ','đ ','đī¸','đ','đ'
];

new Module('poll', 'message', /^!poll/i, function (message) {

	var options = message.content
		.replace('!poll ','')		//remove poll command
		.split(',')					//split into array by comma
		.map(o => o.trim())			//remove space at beginning/end
		.filter(o => o.length > 0);	//remove empty options

	//options not found
	if (!options || options.length < 2) {
		react(message, 'hmm');
		return;
	}

	if (options.length > 100) return react(message,'mad');

	let title = 'POLL:';
	//user put a ? and then a comma
	if (options[0].endsWith('?')) {
		title += ' '+options.shift();
	}
	//user just put a ? and then the first option
	else if (options[0].includes('?')) {
		let titleSplit = options[0].split('?');
		title += ' '+titleSplit[0]+'?';
		options[0] = titleSplit[1].trim();
	}

	//create poll message
	let pollContent = options.map((o,i) => pollIndex[i]+' '+o).join('\n');
	let embed = {
		embed: {
			description: pollContent,
			title: title,
			author: {
		      name: message.author.username,
		      icon_url: 'https://cdn.discordapp.com/avatars/'+message.author.id+'/'+message.author.avatar+'.png'
		    },
	    },
	};

    //send message
    message.channel.send(embed)
		.then(pollMessage => {

    		var optionsToSend = pollIndex.slice(0,options.length);

    		console.log('adding',optionsToSend.length,'options')

    		//add reactions
			react(pollMessage, optionsToSend.splice(0,20));

			var loop = 0;

			while (optionsToSend.length > 0 && loop <= 5) {
				loop++;
				let l = loop;
				let additionalOptions = optionsToSend.splice(0,20);

				message.channel.send('** **')
					.then(additionalOptionsMessage => {
			    		//add reactions
			    		setTimeout(()=> {
			    			react(additionalOptionsMessage, additionalOptions);
			    		}, CONFIG.emojiTimer*20*l);
					});
			}
    	});

	//delete the poll request
    //message.delete();
});


/*global Module, CONFIG, client, log, error, send, react, sendEmoji, pickRandom, messageHasBotPing, isMod */
