const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');
var { updateCMDStore, isbtnID, getCMDStore, getCmdForCmdId, connectdb, input, get, updb, updfb } = require("../lib/database");

cmd({
    pattern: "apply",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    
        if (!isMe) return await reply("⛔ This command is for the owner only. ");

        if (!q || q.trim() === "") {
            return await reply("Please provide a valid prefix.");
        }

        let currentPrefix = await get("PREFIX");

        if (currentPrefix === q) {
            return await reply(`The prefix is already set to: ${q}`);
        }
        
        await input("PREFIX", q);
        await reply(`*Prefix updated to:* ${q}`);

    } catch (e) {
        console.error("Error while updating prefix:", e);
        reply('*Error occurred while updating the prefix.*');
    }
});
