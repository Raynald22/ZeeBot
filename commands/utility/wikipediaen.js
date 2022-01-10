const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const fetch = require("node-fetch");

module.exports = {
    name: 'wikipediaen',
    category: 'utility',
    aliases: ['wiki-en'],
    description: 'Wikipedia articles search (EN).',
    usage: `wikipedia-en`,
    run: async (client, message, args) => {

    const body = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`).then(res => res.json().catch(() => {}));

    if (!body) return message.lineReply('Page tidak ditemukan.');

    if (body.title && body.title === "Not found.") return message.lineReply('Page tidak ditemukan.');

    const embed = new MessageEmbed()

      .setTitle(`__${body.title}__`)
      .setAuthor('Wikipedia (EN)', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wikipedia_svg_logo.svg/1200px-Wikipedia_svg_logo.svg.png')
      .setDescription(`**Artikel dibuat pada**: ${body.timestamp}\n**Deskripsi artikel**: ${body.description}\n\n>>> ${body.extract.substring(0, 500)} **[Baca lebih lanjut](${body.content_urls.desktop.page})**`)
      .setColor(config.COLOR)
      .setFooter(`${message.author.tag}`,  message.author.displayAvatarURL())

    if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
    message.channel.send(embed);

  }
}