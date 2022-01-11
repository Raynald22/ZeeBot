const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const { stripIndents } = require('common-tags');
const config = require('../../config.js')
const { getCMD } = require('../../functions/func.js')

module.exports = {
  name: 'help',
  aliases: ['h'],
  category: 'info',
  description: 'Menampilkan menu.',
  usage: `help [nama_perintah]`,
  run: async (client, message, args) => {

    if (args[0]) return getCMD(client, message, args[0]);

    const ADMINSERVER = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("#B1B1B1")
      .setTitle('ZeeBot • Help')
      .setDescription(`:wrench: __**Moderation**__: \n\`Ban, Changenick, Hidechannel, Kick, Modlog, Mutechannel, Prefix, Unhidechannel, Unmutechannel\`\n:moneybag:  __**Economy**__: \n\`Addsaldo (admin), Balance, Beg, Bet, Buy, Daily, Deletesaldo (admin), Deposit, Monthly, Sell, Shop, Transfer, Weekly, Withdraw, Work\`\n:gear: __**Utility**__: \n\`Afk, Avatar, Charcount, Colorinfo, Emojiinfo, Gif, Image-size, Joox, Kbbi, Lol-champion, Read-qr, Rightstufanime, Spotify, Steamgame, Translate, Weather, Whattext, Wikipedia-en, Wikipedia-id\`\n__**Wibu**__: \n\`Animesearch, Randomwaifu, Whatanime\``)
      .addField('Server Link | DM', '[__**Invite Link**__](https://discord.com/api/oauth2/authorize?client_id=928857345851805848&permissions=8&scope=bot) | [<@!325260673015873548>]()')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setTimestamp();

    const ADMINBOT = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("#B1B1B1")
      .setTitle('ZeeBot • Help')
      .setDescription(`__**Admin Bot**__:\n\`Refresh\`\n :wrench: __**Moderation**__: \n\`Ban, DM, Changenick, Hidechannel, Kick, Modlog, Mutechannel, Prefix, Unhidechannel, Unmutechannel\`\n_:moneybag:  _**Economy**__: \n\`Addsaldo, Balance, Beg, Bet, Buy, Daily, Deletesaldo, Deposit, Monthly, Sell, Shop, Transfer, Weekly, Withdraw, Work\`\n:gear: __**Utility**__: \n\`Afk, Avatar, Charcount, Colorinfo, Emojiinfo, Gif, Image-size, Joox, Kbbi, Lol-champion, Read-qr, Rightstufanime, Spotify, Steamgame, Translate, Weather, Whattext, Wikipedia-en, Wikipedia-id\`\n__**Wibu**__: \n\`Animesearch, Randomwaifu, Whatanime\``)
      .addField('Server Link | DM', '[__**Invite Link**__](https://discord.com/api/oauth2/authorize?client_id=928857345851805848&permissions=8&scope=bot) | [<@!325260673015873548>]()')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setTimestamp();

    const NonADMIN = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("#B1B1B1")
      .setTitle('ZeeBot • Help')
      .setDescription(`:moneybag:  __**Economy**__: \n\`Addsaldo (admin), Balance, Beg, Bet, Buy, Deletesaldo (admin), Daily, Deposit, Monthly, Sell, Shop, Transfer, Weekly, Withdraw, Work\`\n:gear: __**Utility**__: \n\`Afk, Avatar, Charcount, Colorinfo, Emojiinfo, Gif, Image-size, Joox, Kbbi, Lol-champion, Read-qr, Rightstufanime, Spotify, Steamgame, Translate, Weather, Whattext, Wikipedia-en, Wikipedia-id\`\n**Wibu**: \n\`Animesearch, Randomwaifu, Whatanime\``)
      .addField('Server Link | DM', '[__**Invite Link**__](https://discord.com/api/oauth2/authorize?client_id=928857345851805848&permissions=8&scope=bot) | [<@!325260673015873548>]()')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setTimestamp();

    if (message.author.id === '325260673015873548' || message.author.id === '423453260289015808') {
      message.lineReply(ADMINBOT)
    } else if (message.member.hasPermission('ADMINISTRATOR')) {
      message.lineReply(ADMINSERVER)
    } else {
      message.lineReply(NonADMIN)
    }

  }
}