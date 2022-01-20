const ownerid = "325260673015873548";
const Discord = require("discord.js");
const disbut = require("discord-buttons");
const MessageButton = require("discord-buttons");
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "getinvite",
    aliases: ['getinv', 'gi'],
    category: "owner",
    description: "Generates an invitation to  server in question.",
    usage: "[ID | name]",

    run: async (client, message, args) => {


        try {
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle("Invite Link")
                .setDescription("Generates an invite link to the server in question.")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

            const button1 = new disbut.MessageButton()
                .setStyle('url')
                .setLabel("Invite Me")
                .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`);

            return message.channel.send(helpEmbed, { button: [button1] });
        } catch (err) {
            console.log(err);
        }

    }
}