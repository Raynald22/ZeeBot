const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')

module.exports = {
    name: 'avatar',
    category: 'utility',
    aliases: ['ava'],
    description: 'Melihat avatar pengguna.',
    usage: `avatar [mention_pengguna]`,
    run: async (client, message, args) => {

      const User = message.mentions.members.first() || message.author;

          if (!message.mentions.users.size) {     
            let embed = new MessageEmbed()
		
            .setColor(config.COLOR)
            .setAuthor(message.author.username + "'s Avatar", message.author.displayAvatarURL)
            .setImage(message.author.displayAvatarURL({size: 4096, dynamic: true}))  
            message.channel.send(embed)
          }

          const avatarList = message.mentions.users.first()
  
          let embed2 = new MessageEmbed()
            .setTitle(avatarList.username + "'s Avatar")
            .setColor("2f3136")
            .setImage(avatarList.displayAvatarURL({size: 4096, dynamic: true}))
            .setFooter(`Requested by ${message.author.tag}  `, message.author.displayAvatarURL())
            .setTimestamp() 
            message.channel.send(embed2)

  }
}