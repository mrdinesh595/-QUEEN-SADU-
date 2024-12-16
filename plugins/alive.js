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

🦋 *REPLY THE BELOW NUMBER*

*01  BOT'S SPEED*
*02  BOT,S MENU*

*🌻 Have A Nice Day 🌻*

> *ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡᴀ ʙᴏᴛ ʙʏ Qᴜᴇᴇɴ x ᴍᴅ*
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ - ɴᴇᴛʜᴜ ᴍᴀx ʏᴛ*`;
  
        const sentMsg = await conn.sendMessage(from, {
            image: { url: imgUrl }, 
            caption: snm,
           /* fileName: '𝐐𝐔𝐄𝐄𝐍 𝐗 𝐌𝐃',  
            mimetype: "application/msword",
            fileLength: 99999999999999,*/
            contextInfo: {
                forwardingScore: 999,
                isForwarded: false,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐐 𝐔 𝐄 𝐄 𝐍  𝐗  𝐌 𝐃',
                    newsletterJid: "120363322195409882@newsletter",
                },
                externalAdReply: {
                    thumbnailUrl: 'https://pomf2.lain.la/f/hxp64475.jpg',  // Corrected the URL format
                    sourceUrl: 'https://www.youtube.com/@SlNethuMax',
                    mediaType: 1,
                    title: '𝐐𝐔𝐄𝐄𝐍 𝐗 𝐌𝐃 𝐌𝐔𝐋𝐓𝐈 𝐃𝐄𝐕𝐈𝐂𝐄 𝐁𝐎𝐓 💛',
                    body: 'ᴀ Qᴜᴇᴇɴ x ᴍᴅ ᴡᴀ ʙᴏᴛ ᴅᴇꜱᴇᴅ ᴏɴ ʙᴀɪʏʟᴇꜱ',
                    renderLargerThumbnail: false
                }
            }
        }, { qouted: mek });

      conn.ev.on('messages.upsert', async (msgUpdate) => {
            const userMsg = msgUpdate.messages[0];
            if (!userMsg.message || !userMsg.message.extendedTextMessage) return;

            const selectedOption = userMsg.message.extendedTextMessage.text.trim();

            // Validate if the response matches the `.alive` message
            if (
                userMsg.message.extendedTextMessage.contextInfo &&
                userMsg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id
            ) {
                switch (selectedOption) {
                    case '1': {
                        
                        const snm = `.ping`;
                      
                await conn.sendMessage(from, { text: snm }, { quoted: userMsg });
                      
                        break;
                    }
                    case '2': {
                        const snm = `.menu`;
                      
                await conn.sendMessage(from, { text: snm }, { quoted: userMsg });
                      
                        break;
                    }
                    default: {
                        
                        await conn.sendMessage(from, { text: "❌ Invalid option. Please select a valid number." }, { quoted: userMsg });
                        break;
                    }
                }
            }
        });
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your request.");
    }
});
