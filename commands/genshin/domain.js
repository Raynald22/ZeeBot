const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')

function capitalize(word) {
    return word
    .toLowerCase()
    .replace(/\w/, firstLetter => firstLetter.toUpperCase());
}

//replace - with space
function replaceDash(word) {
    return word
    .replace(/-/g, ' ')
}

module.exports = {
    name: 'gdomain',
    description: 'Show domain stats',
    category: 'genshin',
    usage: 'gdomain <name>',
    run: async (client, message, args) => {
        let domain = args.join(' ').replace(/\s/g, '-').toUpperCase();
        
        if (!domain) return message.channel.send('Please provide a domain name.');

        const image = {
            'Cecilia Garden': 'https://www.gensh.in/fileadmin/Database/Domains/domain_ceciliaGarden.jpg',
            'Domain of Guyun': 'https://www.gensh.in/fileadmin/Database/Domains/domain_of_guyun.jpg',
            'Hidden Palace of Lianshan Formula': 'https://www.gensh.in/fileadmin/Database/Domains/domain_hiddenPalaceOfLianshanFormula.jpg',
            'Midsummer Courtyard': 'https://www.gensh.in/fileadmin/Database/Domains/domain_midsummerCourtyard.jpg',
        }

        const day = {
            'mon': '*Monday*',
            'tue': '*Tuesday*',
            'wed': '*Wednesday*',
            'thu': '*Thursday*',
            'fri': '*Friday*',
            'sat': '*Saturday*',
            'sun': '*Sunday*',
        }

        const logo = 'https://img.captain-droid.com/wp-content/uploads/com-mihoyo-genshinimpact-icon.png';


        try {
            const { body } = await request
            .get('https://api.genshin.dev/domains/' + domain)

        const embed = new MessageEmbed()
            .setAuthor('Genshin Domain', logo)
            .setTitle(body.name)
            .setDescription(body.description)
            .addField('Location', body.location, true)
            .addField('Nation', body.nation, true)
            .addField('Type', body.type, true)
            .addField('Recommended Elements', body.recommendedElements, true)
            .addField(`Level ${body.requirements[0].level} | Recomended Level(${body.requirements[0].recommendedLevel}) | Adv. Rank(${body.requirements[0].adventureRank})`, body.requirements[0].leyLineDisorder)
            .addField(`Level ${body.requirements[1].level} | Recomended Level(${body.requirements[1].recommendedLevel}) | Adv. Rank(${body.requirements[1].adventureRank})`, body.requirements[1].leyLineDisorder)
            .addField(`Level ${body.requirements[2].level} | Recomended Level(${body.requirements[2].recommendedLevel}) | Adv. Rank(${body.requirements[2].adventureRank})`, body.requirements[2].leyLineDisorder)
            .addField(`Level ${body.requirements[3].level} | Recomended Level(${body.requirements[3].recommendedLevel}) | Adv. Rank(${body.requirements[3].adventureRank})`, body.requirements[3].leyLineDisorder)
            // .addField(`Rewards`, day[body.rewards[0].day] + '\n' +`Level ${body.rewards[0].details[0].level}\n Exp: ${body.rewards[0].details[0].adventureExperience}, Mora: ${body.rewards[0].details[0].mora}\n Drops: ${body.rewards[0].details[0].drops[0].name} (Min. ${body.rewards[0].details[0].drops[0].drop_min}, Max. ${body.rewards[0].details[0].drops[0].drop_max})`)
            .setImage(image[body.name])
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
            
        return message.channel.send(embed);

        } catch (err) {
            return message.channel.send('Domain' + domain + 'not found');
        }
    }
}