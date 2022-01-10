const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const buttons = ['Q', 'W', 'E', 'R'];

module.exports = {
    name: 'lol-champion',
    category: 'utility',
    aliases: ['lol-champ'],
    description: 'Menampilkan informasi Champion dari Game LOL.',
    usage: `lol-champion`,
    run: async (client, message, args) => {
        const query = args.join(" ")
		if (query === 'satan') query = 'teemo';
		try {

            version = null;
		    champions = null;
			if (!version) await fetchVersion();
			const data = await fetchChampion(query);
			if (!data) return message.lineReply(`\`${query}\` Tidak dapat ditemukan.`);
			const tips = [].concat(data.allytips, data.enemytips);
			const embed = new MessageEmbed()
				.setColor('#B1B1B1')
				.setAuthor('League of Legends', 'https://i.imgur.com/2JL4Rko.png', 'https://leagueoflegends.com/')
				.setTitle(`${data.name} ${data.title}`)
				.setDescription(data.blurb)
				.setThumbnail(`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${data.image.full}`)
				.addField('Attack', data.info.attack, true)
				.addField('Defense', data.info.defense, true)
				.addField('Magic', data.info.magic, true)
				.addField('Difficulty', data.info.difficulty, true)
				.addField('HP', `${data.stats.hp} (${data.stats.hpperlevel}/level)`, true)
				.addField('HP Regen', `${data.stats.hpregen} (${data.stats.hpregenperlevel}/level)`, true)
				.addField('MP', `${data.stats.mp} (${data.stats.mpperlevel}/level)`, true)
				.addField('MP Regen', `${data.stats.mpregen} (${data.stats.mpregenperlevel}/level)`, true)
				.addField('Resource', data.partype, true)
				.addField('Armor', `${data.stats.armor} (${data.stats.armorperlevel}/level)`, true)
				.addField('Attack Damage', `${data.stats.attackdamage} (${data.stats.attackdamageperlevel}/level)`, true)
				.addField('Attack Range', data.stats.attackrange, true)
				.addField('Attack Speed', `${data.stats.attackspeed} (${data.stats.attackspeedperlevel}/level)`, true)
				.addField('Crit', `${data.stats.crit} (${data.stats.critperlevel}/level)`, true)
				.addField('Move Speed', data.stats.movespeed, true)
				.addField('Spell Block', `${data.stats.spellblock} (${data.stats.spellblockperlevel}/level)`, true)
				.addField('Passive', data.passive.name, true)
				.addField('Spells', data.spells.map((spell, i) => `${spell.name} (${buttons[i]})`).join('\n'), true);
			return message.lineReply(`Tip: ${tips[Math.floor(Math.random() * tips.length)]}`, { embed });
		} catch (err) {
			return message.lineReply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}

	async function fetchVersion() {
		const { body } = await request.get('https://ddragon.leagueoflegends.com/api/versions.json');
		[version] = body;
		setTimeout(() => { version = null; }, 3.6e+6);
		return body;
	}

	async function fetchChampions() {
		if (champions && champions.version === version) return champions;
		const { body } = await request
			.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
		champions = body;
		return body;
	}

	async function fetchChampion(query) {
		const champions = await fetchChampions();
		const name = Object.keys(champions.data).find(key => key.toLowerCase() === query);
		if (!name) return null;
		const { id } = champions.data[name];
		const { body } = await request
			.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${id}.json`);
		return body.data[id];
	}
}};