const { cmd, commands } = require('../command');
const config = require('../config');
const {readEnv} = require('../lib/database');
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson, runtime, sleep } = require('../lib/functions');
const imgUrl = 'https://i.ibb.co/ZhkhGQZ/In-Shot-20241129-183242921.jpg'; // This image URL seems unnecessary

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
        // Determine the hosting service based on the hostname length
        if (os.hostname().length == 12) hostname = 'replit';
        else if (os.hostname().length == 36) hostname = 'heroku';
        else if (os.hostname().length == 8) hostname = 'koyeb';
        else hostname = os.hostname();

        // Create the text response with system details
        let monspace = '```';
        const snm = `👋 ${monspace} Hello ${pushname}, I'm alive now ${monspace}

_*This queen sadu whatsapp bot is made for your easy use. This bot is currently active🪄*_

> *Version:* ${require("../package.json").version}
> *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> *Runtime:* ${runtime(process.uptime())}
> *Hostname:* ${hostname}

*☘️ Follow our channel:* https://chat.whatsapp.com/EMRQDL2ANWlJcvs1nw90mv

*Qᴜᴇᴇɴ ꜱᴀᴅᴜ ᴍᴅ ᴡᴀ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ*
*ᴍʀ ᴅɪɴᴇꜱʜ*`;

        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/alive.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mak });

        // Send the message along with an image
        const sentMsg = await conn.sendMessage(from, {
            image: { url: imgUrl },  // Provide a valid image URL
            caption: snm,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇',
                    newsletterJid: "120363322195409882@newsletter",
                }
            }
        }, { quoted: mek });

    } catch (e) {
        reply('*Error !!*');
        console.log(e);  // You can also log the error to troubleshoot
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
        await conn.sendMessage(from, { text: `*ᴘᴏɴɢ*: ${ping} *_ᴍꜱ_*` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});

//------------------ System ---------------------//

cmd({
    pattern: "system",
    desc: "Check bot online or no.",
    category: "general",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, prefix, pushname, reply }) => {
    try {
        let hostname;
        if (os.hostname().length == 12) hostname = 'replit';
        else if (os.hostname().length == 36) hostname = 'heroku';
        else if (os.hostname().length == 8) hostname = 'koyeb';
        else hostname = os.hostname();

        const sssf = `*QUEEN SADU*
        
🎉 *Version :* ${require("../package.json").version}
🗃️ *Memory :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
⏱️ *Runtime :* ${runtime(process.uptime())}
📍 *Platform :* ${hostname}
👤 *Owner :* 𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇
`;

        await conn.sendMessage(from, {
            text: sssf,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇',
                    newsletterJid: "120363322195409882@newsletter",
                }
            }
        }, { quoted: mek });
        
    } catch (e) {
        reply('*Error !!*');
        console.log(e);
    }
});


//------------------ status ---------------------//

cmd({
    pattern: "status",
    desc: "Check bot status",
    category: "main",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Construct the bot status message
        const botStatus = `*QUEEN SADU MD*
        
*╭───────────────◈◈►*
*│ 👾 Bot Status: Online*
*│ 📆 Date: ${new Date().toLocaleDateString()}*
*│ ⏰ Time: ${new Date().toLocaleTimeString()}*
*╰───────────────◈◈►*
`;

        await conn.sendMessage(from, {
            text: botStatus,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇',
                    newsletterJid: "120363322195409882@newsletter",
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

//----------------menu-----------------//

cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "Show the bot's command menu",
    react: "📜",
    category: "main"
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Utility function for uptime
        const runtime = (seconds) => {
            let hrs = Math.floor(seconds / 3600);
            let min = Math.floor((seconds % 3600) / 60);
            let sec = Math.floor(seconds % 60);
            return `${hrs}h ${min}m ${sec}s`;
        };

        // Description with bot details
        let desc = `*👋 Hello ${pushname}*

*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ 」*
> ❄️ *𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
> ❄️ *𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
> ❄️ *𝙿𝙻𝙰𝚃𝙵𝙾𝚁𝙼 -* ${os.hostname()}
*╰───────────◉◉►*
╭───────────◉◉►
│🌻 *NON_BUTTON_MENU* 🌻
│   ───────
│ _1_  *DOWNLOAD MENU*
│ _2_  *SEARCH MENU*
│ _3_  *CONVERT MENU*
│ _4_  *MAIN MENU*
│ _5_  *AI MENU*
│ _6_  *GROUP MENU*
│ _7_  *BUG MENU*
│ _8_  *MOVIE MENU*
│ _9_  *FUN MENU*
╰───────────◉◉►

🦋 *REPLY THE NUMBER YOU WANT TO SELECT*
`;


        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/menu.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mak });
        
        const sentMsg = await conn.sendMessage(from, {
            caption: desc,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'mr dinesh',
                    newsletterJid: "120363322195409882@newsletter",
                },
                externalAdReply: {
                    thumbnailUrl: 'https://pomf2.lain.la/f/hxp64475.jpg',
                    sourceUrl: 'https://www.youtube.com/@SlNethuMax',
                    title: '🌻 𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙳𝚄 𝙼𝙳🌻',
                    body: 'ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙʏ ᴍʀ ᴅɪɴᴇꜱʜ',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        // Listen for user selection in the menu
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Ensure the selected message corresponds to the correct menu
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {
                try {
                    let caption = '';
                    switch (selectedOption) {
                        case '1':
                            caption = `*◈╾──QUEEN SADU DOWNLOAD MENU──╼◈*\n\n*🔮 Command:* song\n*☁️ Desc:* Download yt audio.\n*⌛ Use:* .song\n\n*🔮 Command:* video\n*☁️ Desc:* Download yt video.\n*⌛ Use:* .video\n\n*🔮 Command:* facebook\n*☁️ Desc:* Download fb video or audio.\n*⌛ Use:* .fb\n\n*🔮 Command:* tiktok\n*☁️ Desc:* Download tt video.\n*⌛ Use:* .tt\n\n*🔮 Command:* apk\n*☁️ Desc:* Download app or game.\n*⌛ Use:* .apk`;
                            break;
                        case '2':
                            caption = `*◈╾──QUEEN SADU SEARCH MENU──╼◈*\nhi`;
                            break;
                        case '3':
                            caption = `*◈╾──QUEEN SADU CONVERT MENU──╼◈*\nhi`;
                            break;
                        case '4':
                            caption = `*◈╾──QUEEN SADU MAIN MENU──╼◈*\n\n*🔮 Command:* alive\n*☁️ Desc:* Check bot online or no.\n*⌛ Use:* .alive\n\n*🔮 Command:* menu\n*☁️ Desc:* Get bot's command list.\n*⌛ Use:* .menu\n\n*🔮 Command:* ping\n*☁️ Desc:* Check bot speed.\n*⌛ Use:* .ping\n\n*🔮 Command:* repo\n*☁️ Desc:* Check bot details.\n*⌛ Use:* .repo\n\n*🔮 Command:* system\n*☁️ Desc:* Bot system details.\n*⌛ Use:* .system`;
                            break;
                        case '5':
                            caption = `*◈╾──AI OWNER MENU──╼◈*`;
                            break;
                        case '6':
                            caption = `*◈╾──GROUP OWNER MENU──╼◈*\nhi`;
                            break;
                        case '7':
                            caption = `*◈╾──BUG REPORT MENU──╼◈*\nhi`;
                            break;
                        case '8':
                            caption = `*◈╾──MOVIE MENU──╼◈*\n\n*🔮 Command:* slsub\n*☁️ Desc:* Download sinhalasub movie.\n*⌛ Use:* .slsub\n\n*🔮 Command:* upmkv\n*☁️ Desc:* Sinhalasub movie upload jid location .\n*⌛ Use:* .upmkv`;
                            break;
                        case '9':
                            caption = `*◈╾──FUN MENU──╼◈*\nhi`;
                            break;
                        default:
                            await conn.sendMessage(from, { text: "Invalid option. Please select a valid option🔴" });
                            return;
                    }

                    // Send the appropriate message based on the selected option
                    await conn.sendMessage(from, {
                        image: { url: imageUrl },
                        caption: caption,
                        contextInfo: {
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterName: 'ᴍʀ ᴅɪɴᴇꜱʜ',
                                newsletterJid: "120363322195409882@newsletter",
                            },
                            externalAdReply: {
                                title: '🌻 𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙳𝚄 𝙼𝙳🌻',
                                body: 'ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙʏ ᴍʀ ᴅɪɴᴇꜱʜ',
                                mediaType: 1,
                                sourceUrl: "https://www.youtube.com/@SlNethuMax",
                                thumbnailUrl: 'https://i.ibb.co/ZhkhGQZ/In-Shot-20241129-183242921.jpg',
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                    }, { quoted: mek });

                } catch (error) {
                    console.error(error);
                    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
                    await conn.sendMessage(from, { text: 'An error occurred while processing your request.' });
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await conn.sendMessage(from, { text: 'An error occurred while processing your request.' });
    }
});
