const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
    name: 'ban',
    category: 'moderation',
    description: 'Banned person on this server.',
    usage: `ban <@user> [reason]`,
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
            return message.channel.send('gaada usernya.').then(m => m.delete({ timeout: 5000 }));

        if (!member.bannable)
            return message.channel.send('gabisa di ban.').then(m => m.delete({ timeout: 5000 }));

        if (message.member.roles.highest.position < member.roles.highest.position)
            return message.channel.send('gabisa ban user yang role nya lebih tinggi..').then(m => m.delete({ timeout: 5000 }));

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
                    kickCount: 0,
                    banCount: 1
                });

                await newUser.save()
                    .catch(err => console.error(err));
            } else {
                user.updateOne({
                    banCount: user.banCount + 1
                })
                    .catch(err => console.error(err));
            };
        });

        let reason = 'gaada alesan';

        if (args.length > 1) reason = args.slice(1).join(' ');

        //member.send(`🔨You were \`banned\` from **${message.guild.name}** \n**Reason**: ${reason}.`);
        member.ban({ reason: reason });
        message.channel.send(`${member} udah diban.`).then(m => m.delete({ timeout: 5000 }));
        if (!logChannel) {
            return
        } else {
            const embed = new MessageEmbed()
                .setColor(config.COLOR)
                .setTitle('User Banned')
                .setThumbnail(member.user.avatarURL())
                .addField('Username', member.user.username)
                .addField('ID', member.id)
                .addField('Dibanned sama', message.author)
                .addField('Alesan', reason);

            return logChannel.send(embed);
        };
    }
};