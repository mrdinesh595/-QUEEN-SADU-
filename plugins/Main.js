const { cmd, commands } = require('../command');
const config = require('../config');
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson, runtime, sleep } = require('../lib/functions');
const imgUrl = 'https://pomf2.lain.la/f/hxp64475.jpg';
  

//-----------------------------------------------ALive-----------------------------------------------

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "general",
    react: "🍬",
    filename: __filename
},
async (conn, mek, m, { from, prefix, pushname, reply }) => {
    try {
      
       let hostname;
        if (os.hostname().length == 12) hostname = 'replit';
        else if (os.hostname().length == 36) hostname = 'heroku';
        else if (os.hostname().length == 8) hostname = 'koyeb';
        else hostname = os.hostname();

        // Create the text response with system details
        let monspace = '```';
        const snm = `${monspace}👋 Hello ${pushname}, I'm alive now${monspace}

> *Version:* ${require("../package.json").version}
> *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> *Runtime:* ${runtime(process.uptime())}
> *Platform:* ${hostname}

_*This whatsapp bot is made for your easy use. This bot is currently active💗🪄*_

*☘️ Follow our chanal :*
https://whatsapp.com/channel/0029VagCogPGufJ3kZWjsW3A

> *ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡᴀ ʙᴏᴛ ʙʏ Qᴜᴇᴇɴ ɴᴇᴛʜᴜ ᴍᴅ*
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ - ɴᴇᴛʜᴜ ᴍᴀx ʏᴛ*`;

   /*     await conn.sendMessage(from, {
            audio: { url: 'https://github.com/sl-nethu-max/QUEEN-X-MD-DATABASE/raw/refs/heads/main/media/alive%20.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
        }, { qouted: mek });*/

        const sentMsg = await conn.sendMessage(from, {
            image: config.LOGO, 
            caption: snm,
            footer: config.FOOTER,
           /* fileName: '𝐐𝐔𝐄𝐄𝐍 𝐗 𝐌𝐃',  
            mimetype: "application/msword",
            fileLength: 99999999999999,*/
            contextInfo: {
                forwardingScore: 999,
                isForwarded: false,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐐 𝐔 𝐄 𝐄 𝐍  𝐍𝐄𝐓𝐇𝐔  𝐌 𝐃',
                    newsletterJid: "120363322195409882@newsletter",
                },
                externalAdReply: {
                    thumbnailUrl: '',  // Corrected the URL format
                    sourceUrl: 'https://www.youtube.com/@SlNethuMax',
                    mediaType: 1,
                    title: '𝐐𝐔𝐄𝐄𝐍 𝐍𝐄𝐓𝐇𝐔 𝐌𝐃 𝐌𝐔𝐋𝐓𝐈 𝐃𝐄𝐕𝐈𝐂𝐄 𝐁𝐎𝐓 💛',
                    body: 'ᴀ Qᴜᴇᴇɴ x ᴍᴅ ᴡᴀ ʙᴏᴛ ᴅᴇꜱᴇᴅ ᴏɴ ʙᴀɪʏʟᴇꜱ',
                    renderLargerThumbnail: false
                }
            }
        }, { qouted: mek });
      
        } catch (e) {
            reply('*Error !!*')
            console.log(e)
        }
    });
