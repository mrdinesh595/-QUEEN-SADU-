const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const fs=require('fs');
const path=require('path');
const{readEnv}=require('../lib/database');
var desct = "It Search On Chatgpt Ai For What You Provided."
var needus = "*Please Give Me Words To Search On AI !*" 
var cantf  = "*Server Is Busy. Try Again Later.!*"


cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const config = await readEnv();
    
    // Early check if user is owner
    if (isOwner) return; // If the user is the owner, don't process further
    
    // Ensure there is a body
    if (!body) return reply("ඔබට අයුතු ප්‍රශ්නයක් ලබා දීම අවශ්‍යයි. උදා: '.ai ඔයාව හැදුවේ කවුද?'");

    // Convert body to lowercase for easier comparison
    const q = body.toLowerCase();
    
    // Check if the user is asking about who created the AI
    if (q === "ඔයාව හැදුවේ කවුද?" || q === "who created you?") {
        return reply("මාව නිර්මාණය කරේ NETHU-AI. ඔබට කොහොම හෝ උදව් කල හැක.");
    }

    // Check if the user is asking about eating (colloquial question)
    if (q === "කෑවද බන්" || q === "ate something?") {
        return reply("චුට්ට කෑවා 😊");
    }

    // Check if the user asks in a casual manner (e.g., "mokada karanne")
    if (q === "mokada karanne" || q === "මුකුත් නෑ මට මේවෙලාවේ වැඩක් නෑ") {
        return reply("මුකුත් නෑ මට මේවෙලාවේ වැඩක් නෑ");
    }

    // Check if the user asks "ඔයා කවුද?"
    if (q === "ඔයා කවුද?" || q === "who are you?") {
        return reply("මම NETHU-AI. කොහොමද ඔබට සහයවිය හැක්කේ?");
    }

    // Make the API call to fetch the AI response
    let res = await fetch('https://hercai.onrender.com/v3/hercai?question=' + encodeURIComponent(body))
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            throw new Error("Failed to fetch from API");
        });

    return await reply(res.reply);

  } catch (e) {
    reply("මට ඔබේ ප්‍රශ්නයට උත්තරයක් සොයා ගත නොහැකි විය.");
    console.log(e);
  }
});


//========================AI =============================


cmd({
    pattern: "ai",
    react: '👾',
    desc: desct,
    category: "ai",
    use: '.chatgpt <query>',
    filename: __filename

},

async(conn, mek, m, {from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

    try {

        if (!q) return reply("ඔබට අයුතු ප්‍රශ්නයක් ලබා දීම අවශ්‍යයි. උදා: '.ai ඔයාව හැදුවේ කවුද?'");

        // Check if the user is asking about who created the AI
        if (q.toLowerCase() === "ඔයාව හැදුවේ කවුද?" || q.toLowerCase() === "who created you?") {
            return reply("මාව නිර්මාණය කරේ NETHU-AI. ඔබට කොහොම හෝ උදව් කල හැක.");
        }

        // Check if the user is asking about eating (colloquial question)
        if (q.toLowerCase() === "කෑවද බන්" || q.toLowerCase() === "ate something?") {
            return reply("චුට්ට කෑවා 😊");
        }

        // Check if the user asks in a casual manner (e.g., "mokada karanne")
        if (q.toLowerCase() === "mokada karanne" || q.toLowerCase() === "මුකුත් නෑ මට මේවෙලාවේ වැඩක් නෑ") {
            return reply("මුකුත් නෑ මට මේවෙලාවේ වැඩක් නෑ");
        }

        // Check if the user asks "ඔයා කවුද?"
        if (q.toLowerCase() === "ඔයා කවුද?" || q.toLowerCase() === "who are you?") {
            return reply("මම NETHU-AI. කොහොමද ඔබට සහයවිය හැක්කේ?");
        }

        // API call to fetch a response from the AI service
        let res = await fetchJson('https://hercai.onrender.com/v3/hercai?question=' + q);

        return await reply(res.reply);

    } catch (e) {
        reply("මට ඔබේ ප්‍රශ්නයට උත්තරයක් සොයා ගත නොහැකි විය.");
        console.log(e);
    }

});


/*cmd({
    pattern: "ai",
    react: '👾',
    desc: desct,
    category: "ai",
    use: '.chatgpt <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
//let res = (await fetchJson('https://hercai.onrender.com/v3/hercai?question=' + q)).response
let res = await fetchJson('https://hercai.onrender.com/v3/hercai?question='+q)

return await reply(res.reply)
} catch (e) {
reply(cantf)
console.log(e)
}
})*/

//==============================CHATGPT============================

cmd({
    pattern: "chatgpt",
    alias: ["gpt","openai","chat"],
    react: '👾',
    desc: desct,
    category: "ai",
    use: '.chatgpt <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
//let res = (await fetchJson('https://hercai.onrender.com/v3/hercai?question=' + q)).response
let res = await fetchJson('https://hercai.onrender.com/v3/hercai?question='+q)

return await reply(res.reply)
} catch (e) {
reply(cantf)
console.log(e)
}
})
//==============================CHATGPT2============================

cmd({
    pattern: "chatgpt2",
    alias: ["ai2","gpt2","openai2","chat2"],
    react: '👾',
    desc: desct,
    category: "ai",
    use: '.chatgpt2 <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
//let res = (await fetchJson('https://hercai.onrender.com/v3/hercai?question=' + q)).response
let res = await fetchJson('https://hercai.onrender.com/v3-32k/hercai?question='+q)

return await reply(res.reply)
} catch (e) {
reply(cantf)
console.log(e)
}
})
//==============================TURBO============================

cmd({
    pattern: "turbo",
    alias: ["ai3","gpt3","openai3","chat3"],
    react: '👾',
    desc: desct,
    category: "ai",
    use: '.turbo <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
//let res = (await fetchJson('https://hercai.onrender.com/v3/hercai?question=' + q)).response
let res = await fetchJson('https://hercai.onrender.com/turbo/hercai?question='+q)

return await reply(res.reply)
} catch (e) {
reply(cantf)
console.log(e)
}
})
//==============================TURBO2============================

cmd({
    pattern: "turbo2",
    alias: ["ai4","gpt4","turbo16k","chat4"],
    react: '👾',
    desc: desct,
    category: "ai",
    use: '.turbo16k <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
//let res = (await fetchJson('https://hercai.onrender.com/v3/hercai?question=' + q)).response
let res = await fetchJson('https://hercai.onrender.com/turbo-16k/hercai?question='+q)

return await reply(res.reply)
} catch (e) {
reply(cantf)
console.log(e)
}
})
//==============================GEMINI============================

cmd({
    pattern: "gemini",
    alias: ["ai5","gpt5","openai5","chat5"],
    react: '👾',
    desc: desct,
    category: "ai",
    use: '.gemini <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
//let res = (await fetchJson('https://hercai.onrender.com/v3/hercai?question=' + q)).response
let res = await fetchJson('https://hercai.onrender.com/gemini/hercai?question='+q)

return await reply(res.reply)
} catch (e) {
reply(cantf)
console.log(e)
}
})


