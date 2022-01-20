const akaneko = require('akaneko');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: "ngif",
    category: "nsfw",
    description: "Sends a random gif.",
    
    run: async (client, message, args) => {

        if (message.channel.nsfw === false) {
            return message.channel.send("You can only use this command in NSFW channels!");
        }

        const embed = new MessageEmbed()
            .setImage(await akaneko.nsfw.gifs())
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        message.channel.send(embed);
    }   
        
}