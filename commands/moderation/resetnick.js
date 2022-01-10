const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
    name: 'resetnick',
    category: 'moderation',
    aliases: ['rn'],
    description: 'reset nick user.',
    usage: `resetnick <mention user>`,
    run: async (client, message, args) => {

        if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!325260673015873548> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 10000 }));

        const member = message.mentions.members.first();
        if (!member) return message.lineReply("Mention user.");

        try {
            member.setNickname(null);
        } catch (err) {
            message.lineReply(err)
        }

    }
}