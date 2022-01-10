const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
  name: 'unhidechannel',
  category: 'moderation',
  aliases: ['unhidec'],
  description: 'Membuka perms View Channel pada channel.',
  usage: `unhidechannel`,
  run: async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 5000 }));

    let content = args[0];

    message.channel.overwritePermissions([
      {
        id: message.guild.roles.everyone.id,
        allow: ['VIEW_CHANNEL'],
      },], `Channel ${message.channel.name}\` dibuka kembali.`);

    message.channel.send(`Channel \`${message.channel.name}\` berhasil dibuka kembali.`)

  }
}