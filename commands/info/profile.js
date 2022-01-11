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

        if (member.user.presence.status === 'dnd')
            var status = ':no_entry: Do Not Disturb'
        else if (member.user.presence.status === 'idle')
            var status = ':crescent_moon: Idle'
        else if (member.user.presence.status === 'offline')
            var status = ':black_circle: Offline'
        else if (member.user.presence.status === 'online')
            var status = ':green_circle: Online'
        else if (member.user.presence.status === 'streaming')
            var status = 'Streaming'


        const embed = new MessageEmbed()
            .setColor(config.COLOR)
            .setThumbnail(member.user.avatarURL())
            //.setDescription(`Here is some information I found for ${member}`)
            .setTitle(`Profile si ${member.user.tag}`)
            .addField('ID', member.user.id)
            .addField('Nickname', member.nickname ? member.nickname : 'Tidak ada')
            //.addField('Last message', `${member.lastMessage.content ? `${member.lastMessage.content}` : "Tidak ditemukan"}`)
            .addField('HIghest Role', member.roles.highest)
            .addField('Roles owned', member.roles.cache.map(r => `${r}`).join(', '))
            .addField('Status', status)
            // .addField('Activity', member.user.presence.activities.map(a => `${a.name}`).join(', '))
            .addField('Created At', userCreatedAt)
            .addField('Joined to this channel at', userJoinedAt)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        return message.lineReply(embed).catch(err => console.error(err));
    }
}