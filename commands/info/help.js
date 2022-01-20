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

    // const ADMINSERVER = new MessageEmbed()
    //   .setThumbnail(client.user.displayAvatarURL())
    //   .setColor("#B1B1B1")
    //   .setTitle('ZeeBot • Help')
    //   .setDescription(`:wrench: __**Moderation**__: \n\`Ban, Changenick, Hidechannel, Kick, Modlog, Mutechannel, Prefix, Unhidechannel, Unmutechannel\`\n:moneybag:  __**Economy**__: \n\`Addsaldo (admin), Balance, Beg, Bet, Buy, Daily, Deletesaldo (admin), Deposit, Monthly, Sell, Shop, Transfer, Weekly, Withdraw, Work\`\n:gear: __**Utility**__: \n\`Afk, Avatar, Charcount, Colorinfo, Emojiinfo, Gif, Image-size, Joox, Kbbi, Lol-champion, Read-qr, Rightstufanime, Spotify, Steamgame, Translate, Weather, Whattext, Wikipedia-en, Wikipedia-id\`\n__**Wibu**__: \n\`Animesearch, Randomwaifu, Whatanime\``)
    //   .addField('Server Link | DM', '[__**Invite Link**__](https://discord.com/api/oauth2/authorize?client_id=928857345851805848&permissions=8&scope=bot) | [<@!325260673015873548>]()')
    //   .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    //   .setTimestamp();

    // const ADMINBOT = new MessageEmbed()
    //   .setThumbnail(client.user.displayAvatarURL())
    //   .setColor("#B1B1B1")
    //   .setTitle('ZeeBot • Help')
    //   .setDescription(`__**Admin Bot**__:\n\`Refresh\`\n :wrench: __**Moderation**__: \n\`Ban, DM, Changenick, Hidechannel, Kick, Modlog, Mutechannel, Prefix, Unhidechannel, Unmutechannel\`\n_:moneybag:  _**Economy**__: \n\`Addsaldo, Balance, Beg, Bet, Buy, Daily, Deletesaldo, Deposit, Monthly, Sell, Shop, Transfer, Weekly, Withdraw, Work\`\n:gear: __**Utility**__: \n\`Afk, Avatar, Charcount, Colorinfo, Emojiinfo, Gif, Image-size, Joox, Kbbi, Lol-champion, Read-qr, Rightstufanime, Spotify, Steamgame, Translate, Weather, Whattext, Wikipedia-en, Wikipedia-id\`\n__**Wibu**__: \n\`Animesearch, Randomwaifu, Whatanime\``)
    //   .addField('Server Link | DM', '[__**Invite Link**__](https://discord.com/api/oauth2/authorize?client_id=928857345851805848&permissions=8&scope=bot) | [<@!325260673015873548>]()')
    //   .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    //   .setTimestamp();

    // const NonADMIN = new MessageEmbed()
    //   .setThumbnail(client.user.displayAvatarURL())
    //   .setColor("#B1B1B1")
    //   .setTitle('ZeeBot • Help')
    //   .setDescription(`:moneybag:  __**Economy**__: \n\`Addsaldo (admin), Balance, Beg, Bet, Buy, Deletesaldo (admin), Daily, Deposit, Monthly, Sell, Shop, Transfer, Weekly, Withdraw, Work\`\n:gear: __**Utility**__: \n\`Afk, Avatar, Charcount, Colorinfo, Emojiinfo, Gif, Image-size, Joox, Kbbi, Lol-champion, Read-qr, Rightstufanime, Spotify, Steamgame, Translate, Weather, Whattext, Wikipedia-en, Wikipedia-id\`\n**Wibu**: \n\`Animesearch, Randomwaifu, Whatanime\``)
    //   .addField('Server Link | DM', '[__**Invite Link**__](https://discord.com/api/oauth2/authorize?client_id=928857345851805848&permissions=8&scope=bot) | [<@!325260673015873548>]()')
    //   .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    //   .setTimestamp();

    const ADMINSERVER = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle('Zeepile • Help')
      .addField(':wrench: __**Moderation**__:', `\`Ban\`: Banned user \n \`Changenick\`: Change your nick or member\n \`Hidechannel\`: Hide channel\n \`Kick\`: Kick user\n \`Modlog\`: Sets the channel that moderation actions will be logged in\n \`Mutechannel\`: Mute channel\n \`Prefix\`: Show bot's prefix\n \`Unhidechannel\`: Unhide Channel\n \`Unmutechannel\`: Unmute channel`)
      .addField('\u200b', '\u200b')
      .addField(':moneybag:  __**Economy**__:', `\`Addsaldo\`: Add saldo to user (Only admin)\n \`Balance\`: Show balance\n \`Beg\`: Begging to gain some money\n \`Bet\`: Betting\n \`Buy\`: Buy something\n \`Daily\`: Get money from daily\n \`Deletesaldo (Only admin)\`: Delete user balance\n \`Deposit\`: Deposit balance into bank\n \`Monthly\`: Get balance from monthly\n \`Sell\`: Sell role owned\n \`Shop\`: Shop\n \`Transfer\`: Transfer balance from user to user\n \`Weekly\`: Get balance from weekly\n \`Withdraw\`: Withdraw balance from bank\n \`Work\`: Work to gain some money`)
      .addField('\u200b', '\u200b')
      .addField('__**Utility**__:', `\`Afk\`: Set to mode afk with reason or not\n \`Avatar\`: Show your avatar or member\n \`Charcount\`: Count character\n \`Colorinfo\`: Show info of color\n \`Emojiinfo\`: Show info of emoji\n \`Gif\`: Send gif\n \`Image-size\`: Show size an image\n \`Joox\`: Show songs information from joox\n \`Kbbi\`: Show words information from KBBI\n \`Lol-champion\`: Show champion information from LoL\n \`Read-qr\`: Read QR code into text\n \`Rightstufanime\`: Show anime information from Righstuf\n \`Spotify\`: Show specific song information from Spotify\n \`Steamgame\`: Show game information from Steam\n \`Translate\`: Translate text\n \`Weather\`: Show weathers information\n \`Whattext\`: Show text from an image\n \`Wikipedia-en\`: Give information from Wikipedia English\n \`Wikipedia-id\`: Give information from Wikipedia Indonesia\n`)
      .addField('\u200b', '\u200b')
      .addField(':hearts: __**Wibu**__:', `\`Animesearch\`: Search anime\n \`Randomwaifu\`: Generate random waifu\n \`Whatanime\`: Anime tracer`)
      .addField('\u200b', '\u200b')
      .addField('__**Genshin**__', `\`Genshin\`: Show List of characters\n \`Gcharacter\`: Show character information\n \`Gweapon\`: Show weapon information\n \`Gelement\`: Show elemet information\n \`Genemy\`: Show enemy information\n \`Gdomain\`: Show domain information\n \`Gartifact\`: Show artifacts information\n \`Gnation\`: Show nations information`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setTimestamp();

    const ADMINBOT = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle('Zeepile • Help')
      .addField('__**Admin Bot**__:', `\`Refresh\``)
      .addField('\u200b', '\u200b')
      .addField(':wrench: __**Moderation**__:', `\`Ban\`: Banned user \n \`Changenick\`: Change your nick or member\n \`Hidechannel\`: Hide channel\n \`Kick\`: Kick user\n \`Modlog\`: Sets the channel that moderation actions will be logged in\n \`Mutechannel\`: Mute channel\n \`Prefix\`: Show bot's prefix\n \`Unhidechannel\`: Unhide Channel\n \`Unmutechannel\`: Unmute channel`)
      .addField('\u200b', '\u200b')
      .addField(':moneybag:  __**Economy**__:', `\`Addsaldo\`: Add saldo to user (Only admin)\n \`Balance\`: Show balance\n \`Beg\`: Begging to gain some money\n \`Bet\`: Betting\n \`Buy\`: Buy something\n \`Daily\`: Get money from daily\n \`Deletesaldo (Only admin)\`: Delete user balance\n \`Deposit\`: Deposit balance into bank\n \`Monthly\`: Get balance from monthly\n \`Sell\`: Sell role owned\n \`Shop\`: Shop\n \`Transfer\`: Transfer balance from user to user\n \`Weekly\`: Get balance from weekly\n \`Withdraw\`: Withdraw balance from bank\n \`Work\`: Work to gain some money`)
      .addField('\u200b', '\u200b')
      .addField(':hearts:  __**Wibu**__:', `\`Animesearch\`: Search anime\n \`Randomwaifu\`: Generate random waifu\n \`Whatanime\`: Anime tracer`)
      .addField('\u200b', '\u200b')
      .addField('__**Genshin**__', `\`Genshin\`: Show List of characters\n \`Gcharacter\`: Show character information\n \`Gweapon\`: Show weapon information\n \`Gelement\`: Show elemet information\n \`Genemy\`: Show enemy information\n \`Gdomain\`: Show domain information\n \`Gartifact\`: Show artifacts information\n \`Gnation\`: Show nations information`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setTimestamp();

    const NonADMIN = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle('Zeepile • Help')
      .addField(':moneybag:  __**Economy**__:', `\`Addsaldo\`: Add saldo to user (Only admin)\n \`Balance\`: Show balance\n \`Beg\`: Begging to gain some money\n \`Bet\`: Betting\n \`Buy\`: Buy something\n \`Daily\`: Get money from daily\n \`Deletesaldo (Only admin)\`: Delete user balance\n \`Deposit\`: Deposit balance into bank\n \`Monthly\`: Get balance from monthly\n \`Sell\`: Sell role owned\n \`Shop\`: Shop\n \`Transfer\`: Transfer balance from user to user\n \`Weekly\`: Get balance from weekly\n \`Withdraw\`: Withdraw balance from bank\n \`Work\`: Work to gain some money`)
      .addField('\u200b', '\u200b')
      .addField('__**Utility**__:', `\`Afk\`: Set to mode afk with reason or not\n \`Avatar\`: Show your avatar or member\n \`Charcount\`: Count character\n \`Colorinfo\`: Show info of color\n \`Emojiinfo\`: Show info of emoji\n \`Gif\`: Send gif\n \`Image-size\`: Show size an image\n \`Joox\`: Show songs information from joox\n \`Kbbi\`: Show words information from KBBI\n \`Lol-champion\`: Show champion information from LoL\n \`Read-qr\`: Read QR code into text\n \`Rightstufanime\`: Show anime information from Righstuf\n \`Spotify\`: Show specific song information from Spotify\n \`Steamgame\`: Show game information from Steam\n \`Translate\`: Translate text\n \`Weather\`: Show weathers information\n \`Whattext\`: Show text from an image\n \`Wikipedia-en\`: Give information from Wikipedia English\n \`Wikipedia-id\`: Give information from Wikipedia Indonesia\n`)
      .addField('\u200b', '\u200b')
      .addField(':hearts: __**Wibu**__:', `\`Animesearch\`: Search anime\n \`Randomwaifu\`: Generate random waifu\n \`Whatanime\`: Anime tracer`)
      .addField('\u200b', '\u200b')
      .addField('__**Genshin**__', `\`Genshin\`: Show List of characters\n \`Gcharacter\`: Show character information\n \`Gweapon\`: Show weapon information\n \`Gelement\`: Show elemet information\n \`Genemy\`: Show enemy information\n \`Gdomain\`: Show domain information\n \`Gartifact\`: Show artifacts information\n \`Gnation\`: Show nations information`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setTimestamp();

    const user = message.member;
    const dm = await user.createDM();

    if (message.author.id === '325260673015873548' || message.author.id === '423453260289015808') {
      dm.send(ADMINBOT);
      message.channel.send('I have sent you a DM with all the commands!');
    } else if (message.member.hasPermission('ADMINISTRATOR')) {
      dm.send(ADMINSERVER)
      message.channel.send('I have sent you a DM with all the commands!');
    } else {
      dm.send(NonADMIN)
      message.channel.send('I have sent you a DM with all the commands!');
    }

  }
}