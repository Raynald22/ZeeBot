module.exports = (client) => {

    console.log('Bot telah aktif'.brightGreen)

    // bot dnd
    client.user.setStatus('dnd')
    // bot playing with 
    client.user.setActivity('?help', { type: 'Playing' })
}