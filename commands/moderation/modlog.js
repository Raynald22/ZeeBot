const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');
const config = require('../../config.js')

module.exports = {
    name: 'modlog',
    category: 'moderation',
    description: 'Sets the channel that moderation actions will be logged in.',
    usage: `modlog <#channel>`,
    run: async (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 5000 }));

        const channel = await message.mentions.channels.first();

        if (!channel)
            return message.channel.send('Channel tidak ditemukan, harap masukkan channel yang valid.').then(m => m.delete({ timeout: 5000 }));

        await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: config.PREFIX,
                    logChannelID: channel.id
                });

                await newGuild.save()
                    .catch(err => console.error(err));

                return message.channel.send(`Channel mod logs berhasil diterapkan di ${channel}`);
            } else {
                guild.updateOne({
                    logChannelID: channel.id
                })
                    .catch(err => console.error(err));

                return message.channel.send(`Channel mod logs berhasil diterapkan di ${channel}`);
            };
        });
    }
}