const mongoose = require('mongoose');
const Guild = require('../models/guild');
const config = require('../config.js')

module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: config.PREFIX
    });

    guild.save()
    //.then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('Bergabung ke Server.');
};