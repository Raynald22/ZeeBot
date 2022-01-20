const moment = require('moment')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'reminder',
    description: 'Sets a reminder for you',
    usage: 'reminder <time> <message>',
    category: 'utility',
    cooldown: 5,

    run: async (client, message, args) => {

        if (!args[0]) return message.channel.send('Please provide a time and a message')
        if (!args[1]) return message.channel.send('Please provide a message')

        //set reminder
        const reminder = moment().add(args[0], 's').format('LLLL')

        //create embed
        const reminderEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Reminder')
            .setDescription(`${reminder}`)
            .addField('Message', args.slice(1).join(' '))
            .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp()

        //send reminder
        message.channel.send(reminderEmbed)
    }
}