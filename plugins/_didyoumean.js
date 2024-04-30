import didyoumean from 'didyoumean';
import similarity from 'similarity';

let handler = m => m;

handler.before = function (m, { match, usedPrefix }) {
  if ((usedPrefix = (match[0] || '')[0])) {
    let noPrefix = m.text.replace(usedPrefix, '').trim();
    let alias = Object.values(global.plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1);
    let mean = didyoumean(noPrefix, alias);
    let sim = similarity(noPrefix, mean);
    let similarityPercentage = parseInt(sim * 100);      

    if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
      let response = `• ᴀʀᴇ ʏᴏᴜ ʟᴏᴏᴋɪɴɢ ꜰᴏʀ ᴛʜᴇ ꜰᴏʟʟᴏᴡɪɴɢ ᴍᴇɴᴜ??\n\n◦ ɴᴀᴍᴇ ᴄᴏᴍᴍᴀɴᴅ: ➠ *${usedPrefix + mean}*\n◦ ​🇸​​🇮​​🇲​​🇮​​🇱​​🇦​​🇷​​🇮​​🇹​​🇾​ ​🇷​​🇪​​🇸​​🇺​​🇱​​🇹​​🇸​: ➠ *${similarityPercentage}%*`;

      this.reply(m.chat, response, m, {
        contextInfo: {
          externalAdReply: {
       	showAdAttribution: true,
            title: 'D I D Y O U M E A N',
            thumbnailUrl: 'https://telegra.ph/file/b0fcbd01b1709008da3a3.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029VaczvJDJpe8jWHmigh2S',
            mediaType: 1,
            renderLargerThumbnail: true
                     }
        }
      });
    }
  }
}

export default handler;
