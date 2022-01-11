const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const moment = require('moment')

module.exports = {
    name: 'infobot',
    description: 'Get information about the bot',
    category: 'info',
    aliases: ['botinfo', 'bot'],
    usage: '',

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            //set title with bot name
            .setTitle(`${client.user.username}`)
            .setThumbnail(client.user.displayAvatarURL())
            .addField('Created by', '<@!325260673015873548>')
            .addField('Created on', moment(client.user.createdAt).format('MMMM Do YYYY, h:mm:ss A'))
            .addField('Total Servers', client.guilds.cache.size)
            .addField('Total Users', client.users.cache.size)
            // show bot commands
            .addField('Total Commands', client.commands.size)
            .addField('Total Channels', client.channels.cache.size)
            //prefix
            .addField(`Prefix`, `${config.PREFIX}`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed)
    }
}