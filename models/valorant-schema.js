const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    username: mongoose.Schema.Types.String,
    discordId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    valorantAccount: {
        type: mongoose.Schema.Types.String,
        default: "?",
    }
})

module.exports = mongoose.model('Account', AccountSchema)