const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const axios = require('axios');

module.exports = {
    name: 'whatanime',
    category: 'wibu',
    aliases: [],
    description: 'Anime Tracer.',
    usage: `whatanime`,
    run: async (client, message, args) => {

        const image = message.attachments.size > 0 ? message.attachments.array()[0].url : null;

        if (!image) {
          const noargs = new MessageEmbed()
          .setColor("2f3136")
          .setTitle('__Anime Images Detection__ (Tool)')
          .setDescription(`>>> Administrator: :white_check_mark:\nNon Administrator: :white_check_mark:\n\n**Usage**: Send an Image with Comment **${prefix}Whatanime**`)
          .setFooter(`Command info`)
          return message.lineReply(noargs);
        }
        const traceDetails = await axios(
            `https://api.trace.moe/search?url=${encodeURIComponent(image)}`
          )
            .then((res) => res.data)
            .catch((err) => {
                message.lineReply("unable to fetch the image")
            })
            if (!traceDetails.result.length) return message.lineReply("No result found")
            const animeResult = traceDetails.result[0];
            const animeDetails = await axios
              .post(`https://graphql.anilist.co`, {
                query: `query ($id: Int) {
                Media(id: $id, type: ANIME) {
                  title {
                    english
                  }
                  coverImage {
                    large
                    color
                  }
                  status
                  episodes
                  description
                  bannerImage
                }
              }`,
                variables: {id: animeResult.anilist},
              })
              .then((res) => (res.data ? res.data.data.Media : null))
              .catch((err) => {});
              const Embed = new MessageEmbed()
              .setColor(config.COLOR)
              .setTitle(`__${animeDetails.title.english} __ (?)`)
              .setDescription(animeDetails.description.substring(0, 200) +
              ` **[Baca lebih lanjut](https://anilist.co/anime/${animeResult.anilist})**`)
              .addField(`Traced Image/Video`, `Ep. ${animeResult.episode} [Video Clip](${animeResult.video}) | [Image](${animeResult.image})`, true)
              .addField(`Status`, `${animeDetails.episodes} Episodes (${animeDetails.status})`, true)
              .setImage(animeDetails.bannerImage)
              .setFooter(
                `${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setTimestamp()
              // .setColor(animeDetails.coverImage.color
              //   ? parseInt(animeDetails.coverImage.color.replace('#', '0x'))
              //   : 0xffffff)
              return message.lineReply(Embed)

  }
}