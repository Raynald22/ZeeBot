const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const { Color, isColor } = require("coloras");

module.exports = {
    name: 'colorinfo',
    category: 'utility',
    aliases: [],
    description: 'Menampilkan info dari Color yang diinginkan.',
    usage: `colorinfo`,
    run: async (client, message, args) => {

    if (!args[0]) {
      //random = true;
      const noargs = new MessageEmbed()
      .setColor("2f3136")
      .setTitle('__Colorinfo__ (Tool)')
      .setDescription(`>>> Administrator: :white_check_mark:\nNon Administrator: :white_check_mark:\n\n**Usage**: Colorinfo (HEX/RGB/HSL/HSV/CMYK)\n**Example**: Colorinfo #F74D74`)
      .setFooter(`Command info`)
      return message.lineReply(noargs);
    } else {
      if (!isColor(args.join(" ")).color) return message.lineReply("Color tidak valid");
    }

    //const value = random ? null : args.join(" ");
    const value = args.join(" ");
    const color = new Color(value);

    const embed = new MessageEmbed()
      //.setColor(color.toHex())
      .setColor(config.COLOR)
      .addFields([
        { name: "HEX", value: color.toHex(), inline: true },
        { name: "RGB", value: color.toRgb(), inline: true },
        { name: "HSL", value: color.toHsl(), inline: true },
        { name: "HSV", value: color.toHsv(), inline: true },
        { name: "CMYK", value: color.toCmyk(), inline: true },
        { name: "ㅤ", value: `**[Image Url](${color.imageUrl})**`, inline: false }
      ])
      .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setThumbnail(color.imageUrl);

    return message.lineReply(embed);

  }
}