const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten, formatNumber, capitalize } = require('../../functions/func');

module.exports = {
	name: 'urbandictionary',
	category: 'utility',
	aliases: ['urban'],
	description: 'Urban Dictionary.',
	usage: `urbandictionary`,
	run: async (client, message, args) => {
		const query = args.join(" ")
		try {
			const { body } = await request
				.get('http://api.urbandictionary.com/v0/define')
				.query({ term: query });
			if (!body.list.length) return message.lineReply('Could not find any results.');
			const data = body.list[0];
			const embed = new MessageEmbed()
				.setColor("#B1B1B1")
				.setAuthor('Urban Dictionary', 'https://i.imgur.com/Fo0nRTe.png', 'https://www.urbandictionary.com/')
				.setURL(data.permalink)
				.setTitle(`${capitalize(data.word)}`)
				.setDescription(`${capitalize(shorten(data.definition.replace(/\[|\]/g, '')))}`)
				.setFooter(`👍 ${formatNumber(data.thumbs_up)} 👎 ${formatNumber(data.thumbs_down)}`)
				.setTimestamp(new Date(data.written_on))
				.addField('Example', data.example ? shorten(data.example.replace(/\[|\]/g, ''), 1000) : 'None');
			return message.lineReply(embed);
		} catch (err) {
			return message.lineReply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
