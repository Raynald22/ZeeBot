module.exports = (client) => {

    console.log('Bot telah aktif'.brightGreen)

    client.user.setActivity('?help || ?help <command>', { type: 'PLAYING' })
}