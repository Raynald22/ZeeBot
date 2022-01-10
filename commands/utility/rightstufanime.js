const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const { shorten, getImageURL } = require('../../functions/func');

module.exports = {
	name: 'rightstufanime',
    category: 'utility',
    aliases: ['rs-anime'],
    description: 'Menampilkan info tentang Anime di Rightstuf.',
    usage: `rightstufanime`,
    run: async (client, message, args) => {
		try {
            const query = args.join(" ")
			const { body } = await request
				.get('https://www.rightstufanime.com/api/items')
				.query({
					country: 'US',
					currency: 'USD',
					fieldset: 'search',
					include: '',
					language: 'en',
					limit: 1,
					pricelevel: 2,
					q: query,
					sort: 'relevance:asc',
					custitem_rs_adult: Boolean(message.channel.nsfw)
				});
			if (!body.items.length) return message.lineReply('Could not find any results.');
			const data = body.items[0];
			const embed = new MessageEmbed()
				.setColor("#B1B1B1")
				.setTitle(data.storedisplayname)
				.setURL(`https://www.rightstufanime.com/${data.urlcomponent}`)
				.setAuthor('Right Stuf', 'https://i.imgur.com/CTB8Imp.jpg', 'https://www.rightstufanime.com/')
				.setDescription(shorten(data.storedescription))
				.setThumbnail(getImageURL(data))
				.addField('Price', stripIndents`
					Retail Price: ${data.pricelevel1_formatted}
					Non-Member Price: ${data.pricelevel5_formatted}
					Member Price: ${data.pricelevel3_formatted}
				`);
			return message.lineReply(embed);
		} catch (err) {
			return message.lineReply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}

}};