const { MessageEmbed, Message } = require('discord.js');
const pagination = require('discord.js-pagination')
const request = require('node-superfetch');
const moment = require('moment');
// import format from moment
const { format } = require('date-fns');

module.exports = {
    name: 'v-last-match',
    aliases: ['v-lm'],
    category: 'valorant',
    description: 'View the last match of a player',
    usage: 'v-lm <region><username><tag>',
    run: async (client, message, args) => {

        let region = args[0];
        let username = args[1];
        let tag = args[2];
        
        if(!region) return message.channel.send('Please specify a region!')
        if(!username) return message.channel.send('Please specify a username!')
        if(!tag) return message.channel.send('Please specify a tag!')

        const type = {
            'Deathmatch': 'https://static.wikia.nocookie.net/valorant/images/a/a9/TX_FFAModeIcon.png/revision/latest/top-crop/width/360/height/360?cb=20200805002133',
            'Unrated': 'https://static.wikia.nocookie.net/valorant/images/d/d6/UI_Icon_Modes_Competitive.png/revision/latest/top-crop/width/360/height/360?cb=20200805002134'

        }

        if (!region && !username && !tag) return message.channel.send('Please provide a region, username and tag.');

        try {

            const { body } = await request.get(`https://api.henrikdev.xyz/valorant/v3/matches/${region}/${username}/${tag}`);


            const embed = new MessageEmbed()
            //capitalize first letter of username
            .setAuthor(`${username.charAt(0).toUpperCase() + username.slice(1)}#${tag} Last Match`, `https://storage.qoo-static.com/game/17607/KGhkiIABcwb0ZdwWMfGGBsHCb6gQbQNX.jpg`)
            .addField('Match ID', body.data[0].metadata.matchid)
            .addField('Map', body.data[0].metadata.map, true)
            .addField('Mode', body.data[0].metadata.mode, true)
            .addField('Server', body.data[0].metadata.cluster, true)
            .addField('Match Date', body.data[0].metadata.game_start_patched)
            .addField('Rounds', body.data[0].metadata.rounds_played, true)
            .addField('Time Played', moment(body.data[0].metadata.game_length).format("mm:ss"), true)
            //map json to array
            .addField(`__**Players**__`, body.data[0].players.all_players.map(player => `**${player.name}** **${player.tag}** **as** **${player.character}**\n Kills: ${player.stats.kills} | Deaths: ${player.stats.deaths}`))
            .setThumbnail(type[body.data[0].metadata.mode])
            .setFooter('Requested by ' + message.author.username, message.author.avatarURL())
            .setTimestamp()

            message.channel.send(embed);

        } catch (err) {
            if (err.status === 503) {
                return message.channel.send('Your account is private, please login first at https://tracker.gg/valorant');
            } else if (err.status === 404) {
                return message.channel.send('Account with' + username + '#' + tag + 'not found');
            } else if (err.status === 408) {
                return message.channel.send(`Request timed out, it's taking too long to respond. Please try again later.`);S
            } else if (err.status === 429) {
                return message.channel.send('You have exceeded your rate limit');
            } else if (err.status === 500) {
                return message.channel.send('Internal server error');
            } else if (err.status === 502) {
                return message.channel.send('Bad gateway');
            } else if (err.status === 503) {
                return message.channel.send('Service unavailable');
            } else if (err.status === 504) {
                return message.channel.send('Gateway timeout');
            }
        }
    }
}