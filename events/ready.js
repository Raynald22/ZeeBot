module.exports = (client) => {

    console.log('Bot telah aktif'.brightGreen)

    client.user.setActivity(`Watching`, { type: 'Watching', url: 'https://github.com/Raynald22' })
}