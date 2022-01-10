// purge 1-100 @user
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.js')


//purge message with specific user
module.exports = {
    name: 'purge',
    category: 'moderation',
    aliases: ['hapus'],
    description: 'Hapus pesan.',
    usage: `purge <user> <nomor/1-100>`,
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.lineReply('Kamu harus menyebutkan member yang ingin di purge.');

        if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 5000 }));

        const deleteCount = await parseInt(args[1]);

        if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return await message.lineReply('Masukkan nomor dari 1 sampai dengan 100.').then(m => m.delete({ timeout: 5000 }));
        }

        message.channel.messages.fetch({ limit: deleteCount })
            .then(async function (list) {
                const filter = list => list.author.id === member.id;
                const purge = list.filter(filter);

                if (purge.size < 1) return message.lineReply('Tidak ada pesan yang dapat di purge.');

                message.channel.bulkDelete(purge);

                const embed = new MessageEmbed()
                    .setColor(config.COLOR)
                    .setTitle(`${purge.size} pesan dihapus.`)

                message.channel.send(embed).then(m => m.delete({ timeout: 5000 }));
            }, function (err) {
                message.lineReply(`Ada error, DM <@!325260673015873548>` + err)
            })
    }
}
