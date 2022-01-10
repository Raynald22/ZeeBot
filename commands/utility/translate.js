const { MessageEmbed } = require('discord.js');
const config = require('../../config.js');
const translate = require("translatte");

module.exports = {
  name: 'translate',
  category: 'utility',
  aliases: ['tr'],
  description: 'Translator.',
  usage: `translate`,
  run: async (client, message, args) => {

    try {
      if (!args[0]) return message.channel.send(`<:miawuk:882725546449051648> Error | Unknown Command Usage! \`${prefix}translate <from> <to> <Text>\`\nExample: \`${prefix}translate en de Hello World\``)

      if (!args[1]) return message.channel.send(`<:miawuk:882725546449051648> Error | Unknown Command Usage! \`${prefix}translate <from> <to> <Text>\`\nExample: \`${prefix}translate en de Hello World\``)

      if (!args[2]) return message.channel.send(`<:miawuk:882725546449051648> Error | Unknown Command Usage! \`${prefix}translate <from> <to> <Text>\`\nExample: \`${prefix}translate en de Hello World\``)

      translate(args.slice(2).join(" "), { from: args[0], to: args[1] }).then(res => {
        let embed = new MessageEmbed()
          .setColor("#2f3136")
          .setAuthor(`${args[0].toUpperCase()} to ${args[1].toUpperCase()}`, "https://imgur.com/0DQuCgg.png", "https://discord.gg/FQGXbypRf8")
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription("```" + res.text.substr(0, 2000) + "```")
        message.channel.send(embed)
      }).catch(err => {
        let embed = new MessageEmbed()
          .setColor(config.COLOR)
          .setTitle("Terjadi kesalahan")
          .setDescription(String("```" + err.message + "```").substr(0, 2000))
        message.channel.send(embed)
        //console.log(err);
      });
    } catch (e) {
      //console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(config.COLOR)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setTitle("Terjadi kesalahan")
        .setDescription(`\`\`\`${String(JSON.stringify(e.message)).substr(0, 2000)}\`\`\``)
      );
    }

  }
}