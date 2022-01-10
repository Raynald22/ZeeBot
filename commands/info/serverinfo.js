const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    category: 'info',
    description: 'Menampilkan informasi server.',
    usage: `serverinfo`,
    run: async (client, message, args) => {

        const guildCreatedAt = moment(message.guild.createdAt).format('MM/DD/YYYY - h:mm a')

        const embed = new MessageEmbed()
            .setColor(config.COLOR)
            .setThumbnail(message.guild.iconURL())
            .setTitle(`${message.guild.name}`)
            .addField('ID Server', message.guild.id, true)
            //inline field
            .addField('Server Owner', `<@!${(message.guild.owner.user.id)}>`, true)
            .addField("Total members | Humans | Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
            .addField('Text channels | Voice channels', `${message.guild.channels.cache.filter(channel => channel.type === 'text').size} | ${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}`, true)
            .addField('Total Roles', message.guild.roles.cache.size, true)
            .addField('Created at', guildCreatedAt, true)
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        return message.channel.send(embed).catch(err => console.error(err));
    }
}