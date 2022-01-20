const { MessageEmbed, Message } = require('discord.js');
const pagination = require('discord.js-pagination')
const request = require('node-superfetch');


module.exports = {
    name: "vcharacter",
    category: "valorant",
    description: "Show Valorant Character",
    usage: "vc <name>",
    aliases: ["vc"],
    run: async (client, message, args) => {        
        let uid = args[0];

        if ((uid === 'breach') || (uid === 'Breach')) {
            uid = '5f8d3a7f-467b-97f3-062c-13acf203c006';
        } else if ((uid === 'raze') || (uid === 'Raze')) {
            uid = 'f94c3b30-42be-e959-889c-5aa313dba261';
        } else if ((uid === 'chamber') || (uid === 'Chamber')) {
            uid = '22697a3d-45bf-8dd7-4fec-84a9e28c69d7';
        } else if ((uid === 'Kay/o') || (uid === 'kay/o')) {
            uid = '601dbbe7-43ce-be57-2a40-4abd24953621';
        } else if ((uid === 'Skye') || (uid === 'skye')) {
            uid = '6f2a04ca-43e0-be17-7f36-b3908627744d';
        } else if ((uid === 'Cypher') || (uid === 'cypher')) {
            uid = '117ed9e3-49f3-6512-3ccf-0cada7e3823b';
        } else if ((uid === 'Sova') || (uid === 'sova')) {
            uid = 'ded3520f-4264-bfed-162d-b080e2abccf9';
        } else if ((uid === 'Killjoy') || (uid === 'killjoy')) {
            uid = '1e58de9c-4950-5125-93e9-a0aee9f98746';
        } else if ((uid === 'Viper') || (uid === 'viper')) {
            uid = '707eab51-4836-f488-046a-cda6bf494859';
        } else if ((uid === 'Phoenix') || (uid === 'phoenix')) {
            uid = 'eb93336a-449b-9c1b-0a54-a891f7921d69';
        } else if ((uid === 'Astra') || (uid === 'astra')) {
            uid = '41fb69c1-4189-7b37-f117-bcaf1e96f1bf';
        } else if ((uid === 'Brimstone') || (uid === 'brimstone')) {
            uid = '9f0d8ba9-4140-b941-57d3-a7ad57c6b417';
        } else if ((uid === 'Neon') || (uid === 'neon')) {
            uid = 'bb2a4828-46eb-8cd1-e765-15848195d751';
        } else if ((uid === 'Yoru') || (uid === 'yoru')) {
            uid = '7f94d92c-4234-0a36-9646-3a87eb8b5c89';
        } else if ((uid === 'Sage') || (uid === 'sage')) {
            uid = '569fdd95-4d10-43ab-ca70-79becc718b46';
        } else if ((uid === 'Reyna') || (uid === 'reyna')) {
            uid = 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc';
        } else if ((uid === 'Omen') || (uid === 'omen')) {
            uid = '8e253930-4c05-31dd-1b6c-968525494517';
        } else if ((uid === 'Jett') || (uid === 'jett')) {
            uid = 'add6443a-41bd-e414-f6ad-e58d267f4e95';
        }

            const { body } = await request
                .get(`https://valorant-api.com/v1/agents/` + uid);
                
            const embed = new MessageEmbed()
                .setAuthor('Valorant Agent', `${body.data.displayIcon}`)
                .setTitle(`${body.data.displayName}`)
                .addField('Role', body.data.role === null ? '-' : body.data.role.displayName, true)
                // if value null or undefined send Not Available
                .addField('Tags', `${body.data.characterTags === null ? '-' : body.data.characterTags}`, true)
                // .addField('Tags', `${body.data.characterTags}`, true)
                .addField('Developer', `${body.data.developerName}`, true)
                .addField(`\u200B`, `\u200B`)
                .addField(`Description`, `${body.data.description}`)
                //loop json data, if data null or undefined send Not Available
                .addField(`**Q: ${body.data.abilities[0].displayName}**`, `${body.data.abilities[0].description}`)              
                .addField(`**E: ${body.data.abilities[1].displayName}**`, `${body.data.abilities[1].description}`)              
                .addField(`**C: ${body.data.abilities[2].displayName}**`, `${body.data.abilities[2].description}`)
                .addField(`**X: ${body.data.abilities[3].displayName}**`, `${body.data.abilities[3].description}`)
                .addField(`**Passive: ${body.data.abilities[4] === undefined ? '-' : body.data.abilities[4].displayName}**`, body.data.abilities[4] === undefined ? '-' : body.data.abilities[4].description)
                // .setImage(body.data.fullPortrait)
                .setThumbnail(body.data.displayIcon)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
                


            await message.channel.send(embed);
    }    
}

