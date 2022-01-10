const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
    name: 'prune',
    category: 'moderation',
    aliases: [],
    description: 'Hapus pesan.',
    usage: `prune <nomor/1-100>`,
    run: async (client, message, args) => {

        if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 5000 }));

        const deleteCount = await parseInt(args[0]);

        if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return await message.lineReply('Masukkan nomor dari 1 sampai dengan 100.').then(m => m.delete({ timeout: 5000 }));
        }

        message.channel.messages.fetch({ limit: deleteCount })
            .then(function (list) {
                message.channel.bulkDelete(list);
                //message.channel.send(`${deleteCount} pesan dihapus.`);
            }, function (err) {
                message.lineReply(`Ada error, DM <@!325260673015873548>`)
            })
    }
}