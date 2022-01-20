const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: "vweapon",
    description: "Show Weapon Info",
    category: "valorant",
    usage: "vw <name>",
    aliases: ["vw"],
    run: async (client, message, args) => {

        let uid = args[0];

        if (!uid) return message.channel.send(`Please provide a weapon name.`);

        if ((uid === 'odin') || (uid === 'Odin')) {
            uid = '63e6c2b6-4a8e-869c-3d4c-e38355226584';
        } else if ((uid === 'Ares') || (uid === 'ares')) {
            uid = '55d8a0f4-4274-ca67-fe2c-06ab45efdf58';
        } else if ((uid === 'vandal') || (uid === 'Vandal')) {
            uid = '9c82e19d-4575-0200-1a81-3eacf00cf872';
        } else if ((uid === 'bulldog') || (uid === 'Bulldog')) {
            uid = 'ae3de142-4d85-2547-dd26-4e90bed35cf7';
        } else if ((uid === 'phantom') || (uid === 'Phantom')) {
            uid = 'ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a';
        } else if ((uid === 'judge') || (uid === 'Judge')) {
            uid = 'ec845bf4-4f79-ddda-a3da-0db3774b2794';
        } else if ((uid === 'bucky') || (uid === 'Bucky')) {
            uid = '910be174-449b-c412-ab22-d0873436b21b';
        } else if ((uid === 'frenzy') || (uid === 'Frenzy')) {
            uid = '44d4e95c-4157-0037-81b2-17841bf2e8e3';
        } else if ((uid === 'classic') || (uid === 'Classic')) {
            uid = '29a0cfab-485b-f5d5-779a-b59f85e204a8';
        } else if ((uid === 'ghost') || (uid === 'Ghost')) {
            uid = '1baa85b4-4c70-1284-64bb-6481dfc3bb4e';
        } else if ((uid === 'sheriff') || (uid === 'Sheriff')) {
            uid = 'e336c6b8-418d-9340-d77f-7a9e4cfe0702';
        } else if ((uid === 'shorty') || (uid === 'Shorty')) {
            uid = '42da8ccc-40d5-affc-beec-15aa47b42eda';
        } else if ((uid === 'operator') || (uid === 'Operator')) {
            uid = 'a03b24d3-4319-996d-0f8c-94bbfba1dfc7';
        } else if ((uid === 'guardian') || (uid === 'Guardian')) {
            uid = '4ade7faa-4cf1-8376-95ef-39884480959b';
        } else if ((uid === 'marshal') || (uid === 'Marshal')) {
            uid = 'c4883e50-4494-202c-3ec3-6b8a9284f00b';
        } else if ((uid === 'spectre') || (uid === 'Spectre')) {
            uid = '462080d1-4035-2937-7c09-27aa2a5c27a7';
        } else if ((uid === 'stinger') || (uid === 'Stinger')) {
            uid = 'f7e1b454-4ad4-1063-ec0a-159e56b58941';
        } else if ((uid === 'melee') || (uid === 'Melee')) {
            uid = '2f59173c-4bed-b6c3-2191-dea9b58be9c7';
        }

        const kosong = '';

        try {

            const { body } = await request
                .get(`https://valorant-api.com/v1/weapons/` + uid);

            const embed = new MessageEmbed()
                .setAuthor('Valorant Weapon', `https://storage.qoo-static.com/game/17607/KGhkiIABcwb0ZdwWMfGGBsHCb6gQbQNX.jpg`)
                .setTitle(`${body.data.displayName}`)
                .setThumbnail(body.data.displayIcon)
                .addField('Category', body.data.category.replace(/EEquippableCategory::/g, ""), true)
                // .addField('Cost', body.data.shopData.cost.length < 0 ? '-' : `:coin: ${body.data.shopData.cost}`, true)
                .addField('Cost', body.data.shopData === null ? ':coin: 0' : `:coin: ${body.data.shopData.cost}`, true)
                .addField('__**Statistic**__', '** **')
                .addField(`Fire Rate: ${body.data.weaponStats.fireRate} `, '** **')
                .addField(`Magazine Size: ${body.data.weaponStats.magazineSize}`, '** **')
                .addField(`Run speed multiplier: ${body.data.weaponStats.runSpeedMultiplier}`, `** **`)
                .addField(`Equip time: ${body.data.weaponStats.equipTimeSeconds}`, `** **`)
                .addField(`Reload time: ${body.data.weaponStats.reloadTimeSeconds}`, `** **`)
                .addField(`Fire bullet accuracy: ${body.data.weaponStats.firstBulletAccuracy}`, `** **`)
                .addField(`Shotgun pellet Count: ${body.data.weaponStats.shotgunPelletCount}`, `** **`)
                .addField(`Wall penetration: ${body.data.weaponStats.wallPenetration === null ? '-' : `${body.data.weaponStats.wallPenetration.replace(/EWallPenetrationDisplayType::/g, "")}`}`,  `** **`)
                .addField(`Alt fire type: ${body.data.weaponStats.altFireType === null ? '-' : `${body.data.weaponStats.altFireType.replace(/EWeaponAltFireDisplayType::/g, "")}`}`, `** **`)
                
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp()

                await message.channel.send(embed);

        } catch (err) {
            return message.channel.send(`No results found for ${uid}`);
        }
    }    
}