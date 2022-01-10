const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const func = require('../../functions/func.js')
const signs = require('../../utils/json/zodiac-sign');
const monthsWith30 = [4, 6, 9, 11];

module.exports = {
    name: 'whatzodiac',
    category: 'utility',
    aliases: ['zodiac'],
    description: 'Menampilkan zodiak.',
    usage: `whatzodiac`,
    run: async (client, message, args) => {

    const month = args[0]
    const day = args[1]

    const sign = determineSign(month, day);
		if (!sign) return message.lineReply('Invalid day.');
		return message.lineReply(`The Zodiac Sign for ${month}/${day} is ${sign.name}.`);

    function determineSign(month, day) {
		if (month === 2 && day > 29) return null;
		if (monthsWith30.includes(month) && day > 30) return null;
		if (day < 1 || day > 31) return null;
		return signs.find(sign => {
			if (month === sign.high.month && day <= sign.high.day) return true;
			if (month === sign.low.month && day >= sign.low.day) return true;
			return false;
		});
  }

}}