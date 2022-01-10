const { MessageEmbed } = require('discord.js');
const got = require('got');
const { capitalize } = require('../../functions/func.js')
const { Color } = require("../../config.js");

module.exports = {
    name: 'whatcolor',
    category: 'utility',
    aliases: [],
    description: 'Get color of an image.',
    usage: `whatcolor`,
    run: async (client, message, args) => {

    const image = message.attachments.size > 0 ? message.attachments.array()[0].url : null;
        if (!image) {
          const noargs = new MessageEmbed()
          .setColor("2f3136")
          .setTitle('__Image Colors Detection__ (Tool)')
          .setDescription(`>>> Administrator: :white_check_mark:\nNon Administrator: :white_check_mark:\n\n**Usage**: Send an Image with Comment **${prefix}Whatcolor**`)
          .setFooter(`Command info`)
          return message.channel.send(noargs);
        }
        const apiKey = 'acc_c7805baf741fa2e';
        const apiSecret = '784bdc8f0b6495131b10fc14299cc377';
        (async () => {
            try {
                const {body} = await got(`https://api.imagga.com/v2/colors?image_url=${encodeURIComponent(image)}`, {username: apiKey, password: apiSecret, responseType: 'json'});
                const bgcolors = body.result.colors.background_colors
                const fgcolors = body.result.colors.foreground_colors
                const imgcolors = body.result.colors.image_colors
                const colorvariance = body.result.colors.color_variance
                let no = 0
                let resultz = `\n`
                for (let anu of bgcolors) {
                  no += 1
                  resultz += `${no}. ${capitalize(anu.closest_palette_color)} (${anu.closest_palette_color_html_code}) - ${Math.floor(anu.percent)}%\n`
                }
                resultz += `\n`

                let no2 = 0
                let resultz2 = `\n`
                for (let anu2 of fgcolors) {
                  no2 += 1
                  resultz2 += `${no2}. ${capitalize(anu2.closest_palette_color)} (${anu2.closest_palette_color_html_code}) - ${Math.floor(anu2.percent)}%\n`
                }
                resultz2 += `\n`

                let no3 = 0
                let resultz3 = `\n`
                for (let anu3 of imgcolors) {
                  no3 += 1
                  resultz3 += `${no3}. ${capitalize(anu3.closest_palette_color)} (${anu3.closest_palette_color_html_code}) - ${Math.floor(anu3.percent)}%\n`
                }
                resultz3 += `\n`
                const Embed = new MessageEmbed()
                .setColor('2f3136')
                .setTitle(`__Image Colors Detection__`)
                .setDescription(`**Background Colors** (Closest Palette): ${resultz} **Foreground Colors** (Closest Palette): ${resultz2} **Image Colors** (Closest Palette): ${resultz3}\n**Color Variance**: ${colorvariance}`)
                .setThumbnail(`${image}`)
                .setFooter(
                  `Requested by ${message.author.tag}`,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()
                return message.channel.send(Embed)
            } catch (error) {
                return message.channel.send(error);
            }
        })();

    //End
  }
};