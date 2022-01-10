const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
    name: 'kick',
    category: 'moderation',
    description: 'Kicks the mentioned user from your server.',
    usage: `kick <@user> [reason]`,
    run: async (client, message, args) => {
        message.delete();

        const member = message.mentions.members.first();

        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: config.PREFIX,
                    logChannelID: null
                });

                await newGuild.save()
                    .catch(err => console.error(err));
            };
        });

        const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

        if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 5000 }));

        if (!member)
            return message.lineReply(`Pengguna tidak ditemukan, harap mention pengguna yang valid.`);

        if (!member.kickable)
            return message.lineReply(`Tidak bisa mengeluarkan pengguna ini.`);

        if (message.member.roles.highest.position < member.roles.highest.position)
            return message.lineReply(`Tidak bisa mengeluarkan pengguna yang role nya lebih tinggi.`);

        User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);

            if (!user) {
                const newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: member.id,
                    muteCount: 0,
                    warnCount: 0,
                    kickCount: 1,
                    banCount: 0
                });

                await newUser.save()
                    .catch(err => console.error(err));
            } else {
                user.updateOne({
                    kickCount: user.kickCount + 1
                })
                    .catch(err => console.error(err));
            };
        });

        let reason = 'Tidak ada alasan.';

        if (args.length > 1) reason = args.slice(1).join(' ');

        member.kick(reason);
        message.channel.send(`Pengguna ${member} telah dikeluarkan dari server.`);
        if (!logChannel) {
            return
        } else {
            const embed = new MessageEmbed()
                .setColor(config.COLOR)
                .setTitle('Pengguna dikeluarkan')
                .setThumbnail(member.user.avatarURL())
                .setDescription(`${member.user.tag} (${member.id})\n\n**Yang ngeluarin**: ${message.author}\n**Alasan dikeluarkan**: ${reason}`);

            return logChannel.send(embed);
        };
    }
};