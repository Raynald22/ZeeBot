const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const superagent = require("snekfetch");

module.exports = {
    name: 'randomwaifu',
    category: 'wibu',
    aliases: ['w', 'waifu'],
    description: 'Get random waifu.',
    usage: `randomwaifu`,
    run: async (client, message, args) => {

      superagent.get('https://nekos.life/api/v2/img/waifu').end((err, response) => {
          const embed = new MessageEmbed()
          .setTitle("__Random Waifu__")
          .setImage(response.body.url)
          .setColor(config.COLOR)
          .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL({   dynamic: true }))
          .setTimestamp()
          .setURL(response.body.url);
          message.channel.send(embed);
      }).catch((err) => console.log(err));

  }
}