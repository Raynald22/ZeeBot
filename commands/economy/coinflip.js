const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')

module.exports = {
    name: 'coinflip',
    category: 'economy',
    aliases: ['coin'],
    description: 'Bermain Coin Flip',
    usage: `coin <heads/tails>`,
    yangbisapakai: 'Semua pengguna',

    run: async (client, message, args) => {
        const n = Math.floor(Math.random() * 2);
        let result;
        if (n === 1) result = 'Heads';
        else result = 'Tails';
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**${message.member.displayName} Flipped ${result}**!`)
        message.channel.send(embed);
    }
};