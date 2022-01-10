const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
    name: 'changenick',
    category: 'moderation',
    aliases: ['cn'],
    description: 'Mengganti nickname ke pengguna lain.',
    usage: `changenick <mention_pengguna> <new_nick>`,
    run: async (client, message, args) => {

        if (!message.member.hasPermission('Hades') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 5000 }));

        const member = message.mentions.members.first();
        if (!member) return message.lineReply("Mention pengguna yang ingin kamu ubah nicknya");

        const argument = args.slice(1).join(" ");
        if (!argument) return message.lineReply("Masukkan nick.")

        try {
            member.setNickname(argument);
        } catch (err) {
            message.lineReply(err)
        }

    }
}