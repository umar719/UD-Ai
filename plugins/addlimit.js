let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Incorrect format!\n\nAdd limits: addlimit <tag orang> <number of limits>\nReduce limits: remlimit <tag orang> <number of limits>'
    
    // Extracting the mentioned user and the limit value from the command text
    let [who, limitValue] = text.split(' ')
    if (!who) throw 'Tag the person whose limit you want to change!'
    if (isNaN(limitValue)) throw 'The limit amount must be a number!'

    // Converting limitValue to a number
    limitValue = parseInt(limitValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their limit to 0
    if (!users[user]) users[user] = { limit: 0 }

    // Determining whether to add or remove limit based on the command
    if (command === 'addlimit') {
        // Adding the specified limit to the user's account
        users[user].limit += limitValue
        conn.reply(m.chat, `Added successfully ${limitValue} limit For @${user.split('@')[0]}!`, m)
    } else if (command === 'remlimit') {
        if (limitValue > users[user].limit) {
            // Set the user's limit to 0 if the specified limit is greater than the user's current limit
            users[user].limit = 0
            conn.reply(m.chat, `Berhasil mengurangi limit untuk @${user.split('@')[0]}. Limit kini menjadi 0!`, m)
        } else {
            // Removing the specified limit from the user's account
            users[user].limit -= limitValue
            conn.reply(m.chat, `Successfully reduced ${limitValue} limit For @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addlimit', 'remlimit']
handler.tags = ['owner']
handler.command = /^(add|rem)limit$/i
handler.rowner = true

export default handler
