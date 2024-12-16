const { cmd, commands } = require('../command');
const config = require('../config');
const {readEnv} = require('../lib/database');
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson, runtime, sleep } = require('../lib/functions');
const imgUrl = 'https://pomf2.lain.la/f/5wapkl5g.jpg'; // This image URL seems unnecessary

//-----------------------------------------------ALive-----------------------------------------------

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "general",
    react: "🎀",
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
        const snm = `${monspace} Hello ${pushname}, I'm alive now${monspace}

_*This whatsapp bot is made for your easy use. This bot is currently active🪄*_

> *Version:* ${require("../package.json").version}
> *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> *Runtime:* ${runtime(process.uptime())}
> *Platform:* ${hostname}

*☘️ Follow our chanal :* https://whatsapp.com/channel/0029VagCogPGufJ3kZWjsW3A](https://whatsapp.com/channel/0029VagCogPGufJ3kZWjsW3A)

*Qᴜᴇᴇɴ ɴᴇᴛʜᴜ ᴍᴅ ᴡᴀ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ɴᴇᴛʜᴜ ᴍᴀx ʏᴛ*`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: imgUrl },
            caption: snm,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'ɴᴇᴛʜᴜ ᴍᴀx ʏᴛ',
                    newsletterJid: "120363322195409882@newsletter",
                },
                externalAdReply: {
                    thumbnailUrl: '',  
                    sourceUrl: '[https://www.youtube.com/@SlNethuMax](https://www.youtube.com/@SlNethuMax)',
                    mediaType: 1,
                    title: '𝗤𝗨𝗘𝗘𝗡-𝗡𝗘𝗧𝗛𝗨-𝗠𝗗',
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

//------------------ Ping ---------------------//

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*📡  ʀᴜɴɪɴɢ ʀᴇsᴘᴏɴᴅ...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*ᴘᴏɴɢ*: ${ping} *_ms_*` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
