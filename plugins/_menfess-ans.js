const delay = time => new Promise(res => setTimeout(res, time))
export async function before(m) {
	if (!m.chat.endsWith('@s.whatsapp.net')) return !0;
	this.menfess = this.menfess ? this.menfess : {}
	let mf = Object.values(this.menfess).find(v => v.status === false && v.penerima == m.sender)
	if (!mf) return !0
	console.log({ text: m.text, type: m.quoted?.mtype })
	if ((m.text === 'REPLY MESSAGE' || m.text === '') && m.quoted.mtype == 'extendedTextMessage') return m.reply("Please send your reply message.\nType a message then send it, then the message will automatically go to the message reply target.");
	else {
		let txt = `Hi Bbe @${mf.dari.split('@')[0]}, you received a reply.\n\nThe message you sent previously:\n${mf.pesan}\n\nThe reply message:\n${m.text}\n`.trim();
		await this.reply(mf.dari, txt, null).then(() => {
			m.reply('Successfully Sent reply.')
			delay(1500)
			delete this.menfess[mf.id]
			return !0
		})
	}
	return !0
}
/* Made By Umar
 * https://github.com/umar719
 * Want to make a feature but can't code?
 * contact: https://wa.me/923184671668
*/
