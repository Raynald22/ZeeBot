const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const moment = require('moment')

module.exports = {
    name: 'profile',
    category: 'info',
    description: 'Menampilkan informasi pengguna.',
    usage: `profile <mention_seseorang>`,
    run: async (client, message, args) => {
        const member = message.mentions.members.first();

        if (!member)
            return message.lineReply('Mention orangnya.').then(m => m.delete({ timeout: 5000 }));

        const userCreatedAt = moment(member.user.createdAt).format('MM/DD/YYYY - h:mm a')

        const userJoinedAt = moment(member.joinedAt).format('MM/DD/YYYY - h:mm a')

        const embed = new MessageEmbed()
            .setColor(config.COLOR)
            .setThumbnail(member.user.avatarURL())
            //.setDescription(`Here is some information I found for ${member}`)
            .setTitle(`Profile si ${member.user.tag}`)
            .addField('ID', member.user.id)
            .addField('Created At', userCreatedAt)
            .addField('Joined to this channel at', userJoinedAt)
            //.addField('Last message', `${member.lastMessage.content ? `${member.lastMessage.content}` : "Tidak ditemukan"}`)
            .addField('HIghest Role', member.roles.highest)
            .addField('Roles owned', member.roles.cache.map(r => `${r}`).join(', '))
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        return message.lineReply(embed).catch(err => console.error(err));
    }
}