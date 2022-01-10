const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
    name: 'prefix',
    category: 'moderation',
    description: 'Sets the prefix for this server.',
    usage: `prefix <newPrefix>`,
    run: async (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 5000 }));

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: config.PREFIX
                })

                newGuild.save()
                    .catch(err => console.error(err));

                return message.lineReply('Server ini belum terdaftar di database, silahkan undang ulang bot.').then(m => m.delete({ timeout: 10000 }));
            }
        });

        if (args.length < 1) {
            return message.channel.send(`Prefix: \`${settings.prefix}\`\n\nUntuk ubah: \`${settings.prefix}\`prefix <new_prefix>`).then(m => m.delete({ timeout: 10000 }));
        };

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`Prefix untuk server ini telah diubah menjadi \`${args[0]}\``);
    }
}