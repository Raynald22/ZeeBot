// announcement commands
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.export = {
    name: 'announcement',
    description: 'Announcement command',
    category: 'info',
    aliases: ['announce', 'announcement'],
    usage: 'announcement <#channel> <announcement>',
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission to use this command.');
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I do not have permission to use this command.');
        if (args.length < 2) return message.channel.send('You need to provide a channel and announcement.');
        const channel = message.mentions.channels.first();
        if (!channel) return message.channel.send('You need to provide a channel.');
        const announcement = args.slice(1).join(' ');
        if (!announcement) return message.channel.send('You need to provide an announcement.');
        const embed = new MessageEmbed()
            .addField('Announcement', announcement)
            .setFooter(`Announcement by ${message.author.tag}`)
            .setTimestamp();
        channel.send(embed);
        message.channel.send('Announcement sent.');
    }
}


