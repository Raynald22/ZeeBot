const mongoose = require('mongoose');
const Guild = require('../models/guild');
const config = require('../config.js')

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const settings = await Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        //if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: config.PREFIX,
                logChannelID: null
            })

            newGuild.save()
                //.then(result => console.log(result))
                .catch(err => console.error(err));

            return message.channel.send('Server belum terdaftar di Database, silahkan undang ulang bot.').then(m => m.delete({ timeout: 10000 }));
        }
    });

    // var system1 = false
    // var system2 = false
    // var player = []

    const prefix = settings.prefix;

    message.mentions.users.forEach(user => {
        if (user.id == client.user.id) {
            message.lineReply(`ngp?\npake\`${prefix}\` buat make`)
        }
    })

    //iff user mention <!@325260673015873548> say "ngp?"
    if (message.mentions.users.size > 0) {
        message.mentions.users.forEach(user => {
            if (user.id == '325260673015873548') {
                message.lineReply('ngp?')
            }
        })
    }

    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const currencysystem = client.cs

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
};