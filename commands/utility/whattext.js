const got = require('got');
const Guild = require('../../models/guild');
const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
function capitalize(word) {
  return word
    .toLowerCase()
    .replace(/\w/, firstLetter => firstLetter.toUpperCase());
}

module.exports = {
  name: 'whattext',
  category: 'utility',
  aliases: [],
  description: 'Menampilkan isi teks dari suatu gambar.',
  usage: `Kirim gambar dengan comment \`whattext\``,

  run: async (client, message, args) => {

    const guildDB = await Guild.findOne({
      guildID: message.guild.id
    })

    const image = message.attachments.size > 0 ? message.attachments.array()[0].url : null;

    if (!image) {
      const noargs = new MessageEmbed()
        .setColor("2f3136")
        .setTitle('__Image Text Detection__ (Tool)')
        .setDescription(`>>> Administrator: :white_check_mark:\nNon Administrator: :white_check_mark:\n\n**Usage**: Send an Image with Comment **${guildDB.prefix}Whattext**`)
        .setFooter(`Command info`)
      return message.lineReply(noargs);
    }

    let waitMessages = new MessageEmbed()
      .setTitle('**__Image Text Detection__**')
      .setDescription(`Tunggu sebentar...`)
      .setColor("#2f3136")
    const waitMessage = await message.lineReply(waitMessages)

    const apiKey = 'acc_c7805baf741fa2e';
    const apiSecret = '784bdc8f0b6495131b10fc14299cc377';
    (async () => {
      try {
        const { body } = await got(`https://api.imagga.com/v2/text?image_url=${encodeURIComponent(image)}`, { username: apiKey, password: apiSecret, responseType: 'json' });
        let resultz = `\n`
        for (let anu of body.result.text) {
          resultz += `${anu.data}\n`
        }
        resultz += `\n`
        if (resultz.length > 2045) {
          let respaun;
          try {
            respaun = await sourcebin.create([
              {
                name: ' ',
                content: resultz,
                languageId: 'text',
              },
            ], {
              title: `Transcripted text for ${message.author.tag}`,
              description: ' ',
            });
          }
          catch (e) {
            return waitMessage.edit('Error occurred, <@!325260673015873548>');
          }
          const Embed2 = new MessageEmbed()
            .setColor('2f3136')
            .setTitle(`__Image Text Detection__`)
            .setDescription(`**The text exceeds 2000+ Characters, I'll transcript that**.\n**[Visit here](${respaun.url})**`)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
          waitMessage.edit(Embed2);
        } else {
          const Embed = new MessageEmbed()
            .setColor('2f3136')
            .setTitle(`__Image Text Detection__`)
            .setDescription(`${resultz}`)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
          waitMessage.edit(Embed);
        }
      } catch (error) {
        return message.lineReply(error);
      }
    })();

  }
}