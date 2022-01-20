const { Client, Collection } = require('discord.js');
const keep_alive = require('./keep_alive.js')
const config = require('./config.js');
const colors = require("colors");
const fs = require('fs');
const mongoose = require('mongoose');
const moment = require('moment');
const client = new Client({
  allowedMentions: {
    repliedUser: false
  }
});

const AFKS = require('./models/afk-schema');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;
//cs.connect(config.MONGOURL)
cs.setMongoURL(config.MONGOURL);
require("./ExtendedMessage.js");

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');

client.categories = fs.readdirSync('./commands/');

// config({
//     path: `${__dirname}/.json`
// });

['command'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    //console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});

client.on('message', async (message) => {
  if (!message.guild || message.author.bot) return;

  var system1 = false
  var system2 = false
  var player = []

  let data_afk_1;
  try {
    data_afk_1 = await AFKS.findOne({
      userId: message.author.id,
      guildId: message.guild.id
    })
    if (!data_afk_1) {
      data_afk_1 = await AFKS.create({
        userId: message.author.id,
        guildId: message.guild.id
      })
    }
  } catch (error) {
    console.log(error)
  }

  if (data_afk_1.AFK == true) {
    data_afk_1.AFK_Reason = null
    data_afk_1.AFK = false
    message.lineReply(`Berhasil menonaktifkan mode AFK.`)
    await data_afk_1.save()

    message.member.setNickname(null)
  }

  if (message.mentions.members.first()) {
    let data_afk_2;
    try {
      data_afk_2 = await AFKS.findOne({
        userId: message.mentions.members.first().id,
        guildId: message.guild.id
      })
      if (!data_afk_2) {
        data_afk_2 = await AFKS.create({
          userId: message.mentions.members.first().id,
          guildId: message.guild.id
        })
      }
    } catch (error) {
      console.log(error)
    }

    if (data_afk_2.AFK == true) {
      message.lineReply(`${message.mentions.members.first().user.username} lg afk (\`${data_afk_2.AFK_Reason || '-'}\`)`)
    }
  }

});

keep_alive();
client.mongoose.init();
client.login(config.TOKEN);