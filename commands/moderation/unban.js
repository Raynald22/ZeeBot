const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
  name: 'unban',
  category: 'moderation',
  description: 'Unban user yang di banned di server.',
  usage: `unban <ID User>`,
  run: async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 5000 }));

    const guildDB = await Guild.findOne({
      guildID: message.guild.id
    })

    const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

    const member = args[0]

    if (!args[0]) return message.lineReply('Kirim ID user.').then(m => m.delete({ timeout: 10000 }));

    let reason = 'gaada alesan';

    if (args.length > 1) reason = args.slice(1).join(' ');

    message.guild.members.unban(`${member}`, `${reason}`)

    message.lineReply(`udah diunban, ID \`${member}\``).then(m => m.delete({ timeout: 5000 }))

    if (!logChannel) {
      return
    } else {
      const banembed = new MessageEmbed()
        .setColor(config.COLOR)
        .setTitle('User Unbanned')
        .addField('ID', member)
        .addField('Unbanned sama', message.author)
        .addField('Alesan', reason)

      return logChannel.send(banembed);
    };

  }
};