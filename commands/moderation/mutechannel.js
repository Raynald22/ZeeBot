const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
  name: 'mutechannel',
  category: 'moderation',
  aliases: ['mutec'],
  description: 'Menghapus perms Send Message pada channel.',
  usage: `mutechannel`,
  run: async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> ..').then(m => m.delete({ timeout: 5000 }));

    let content = args[0];

    message.channel.overwritePermissions([
      {
        id: message.guild.roles.everyone.id,
        deny: ['SEND_MESSAGES'],
      },], `\`${message.channel.name}\` dimute sementara.`);

    message.channel.send(`Channel \`${message.channel.name}\` dimute sementara.`)

  }
}