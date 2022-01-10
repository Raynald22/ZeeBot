const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { formatNumber, formatter, formatRupiah2, formatRupiah } = require('../../functions/func');

module.exports = {
	name: 'steamgame',
	category: 'utility',
	aliases: ['steam'],
	description: 'Menampilkan info tentang game di steam.',
	usage: `steamgame`,
	run: async (client, message, args) => {
		try {
			const query = args.join(" ")
			const id = await search(query);
			if (!id) return message.lineReply('Could not find any results.');
			const data = await fetchGame(id);
			const current = data.price_overview ? `Rp.${data.price_overview.final / 100}` : 'Free';
			const original = data.price_overview ? `Rp.${data.price_overview.initial / 100}` : 'Free';
			const price = current === original ? current : `~~${original}~~ ${current}  | ${formatNumber(current)}`;
			const platforms = [];
			if (data.platforms) {
				if (data.platforms.windows) platforms.push('Windows');
				if (data.platforms.mac) platforms.push('Mac');
				if (data.platforms.linux) platforms.push('Linux');
			}
			const embed = new MessageEmbed()
				.setColor("#B1B1B1")
				.setAuthor('Steam', 'https://i.imgur.com/xxr2UBZ.png', 'http://store.steampowered.com/')
				.setTitle(data.name)
				.setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
				.addField('Price', price, true)
				.addField('Metascore', data.metacritic ? data.metacritic.score : '-', true)
				.addField('Recommendation', `:thumbsup: | ${data.recommendations}` ? `:thumbsup: | ${formatNumber(data.recommendations.total)}` : '-', true)
				.addField('Platform', platforms.join(', ') || 'None', true)
				.addField('Release Date', data.release_date ? data.release_date.date : '-', true)
				.addField('DLC', data.dlc ? formatNumber(data.dlc.length) : 0, true)
				.addField('Developer', data.developers ? data.developers.join(', ') || '-' : '-')
				.addField('Release by', data.publishers ? data.publishers.join(', ') || '-' : '-')
				//set image if available else set logo
				.setImage(data.header_image || data.logo_url)

			return message.lineReply(embed);
		} catch (err) {
			return message.lineReply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}


		async function search(query) {
			const { body } = await request
				.get('https://store.steampowered.com/api/storesearch')
				.query({
					cc: 'us',
					l: 'en',
					term: query
				});
			if (!body.items.length) return null;
			return body.items[0].id;
		}

		async function fetchGame(id) {
			const { body } = await request
				.get('https://store.steampowered.com/api/appdetails')
				.query({ appids: id });
			return body[id.toString()].data;
		}
	}
};
