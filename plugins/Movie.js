const { fetchJson } = require('../lib/functions');
const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

// Updated API URLs
const searchApiUrl = 'https://darksadas-yt-sinhalasub-search.vercel.app/?q=';
const movieInfoApiUrl = 'https://darksadas-yt-sinhalasub-info-dl.vercel.app/?url=';
const movieDownloadApiUrl = 'https://darksadas-yt-sinhalasub-dl.vercel.app/?url=';
const pixeldrainApiUrl = 'https://pixeldrain.com/api/file/';

// Command to search for a movie
cmd({
    pattern: "smovie",
    desc: "Search for a movie",
    alias: ["serchmovie"],
    category: "movie",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const input = q.trim();
        if (!input) return reply("Please provide a movie or TV show name to search.");

        // Fetch search results using the new API
        const result = await fetchJson(`${searchApiUrl}${encodeURIComponent(input)}`);

        if (!result || result.status !== "success" || result.results.length === 0) {
            return reply("No results found.");
        }

        let message = "*🍿 QUEEN X MD Search Results:*\n\n";
        result.results.forEach((item, index) => {
            message += `${index + 1}. *${item.title}*\n*Type*: ${item.type}\n*Link*: ${item.link}\n\n`;
        });

        // Send message with image and search results
        await conn.sendMessage(from, {
            image: { url: 'https://pomf2.lain.la/f/hxp64475.jpg' },
            caption: message
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        return reply(`Error: ${e.message || e}`);
    }
});

// Command to fetch movie details and download options
cmd({
    pattern: "movie",
    desc: "Search for a movie and get details and download options.",
    alias: ["sinhalasub"],
    category: "movie",
    react: "🍿",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const input = q.trim();
        if (!input) return reply("Please provide a movie name to search.");
        
        // Step 1: Search for the movie
        const searchResults = await fetchJson(`${searchApiUrl}${encodeURIComponent(input)}`);
        if (!searchResults || searchResults.status !== "success" || searchResults.results.length === 0) {
            return reply("No results found.");
        }

        let message = "*🍿 QUEEN X MD MOVIE DL 🍿*\n\n🔢 Reply Below Number\n\n";
        searchResults.results.forEach((item, index) => {
            message += `${index + 1}. *${item.title}*\n*Type*: *${item.type}*\n*Link*: ${item.link}\n\n`;
        });

        // Step 2: Send search results with an image (thumbnail)
        const sentMsg = await conn.sendMessage(from, {
            image: { url: 'https://pomf2.lain.la/f/hxp64475.jpg' },
            caption: message,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '乡 QUEEN-X-OFFICIAL 乡',
                    newsletterJid: "120363322195409882@newsletter",
                },
                externalAdReply: {
                    title: 'Sinhalasub',
                    body: '',
                    mediaType: 1,
                    sourceUrl: "https://sinhalasub.lk/",
                    thumbnailUrl: 'https://pomf2.lain.la/f/hxp64475.jpg',
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

        // Step 3: Wait for the user to select a movie by number
        const messageListener = async (update) => {
            const message = update.messages[0];
            if (!message.message || !message.message.extendedTextMessage) return;

            const userReply = message.message.extendedTextMessage.text.trim();
            const selectedMovieIndex = parseInt(userReply) - 1;

            if (selectedMovieIndex < 0 || selectedMovieIndex >= searchResults.results.length) {
                await conn.sendMessage(from, {
                    react: { text: '❌', key: mek.key }
                });
                return reply("Invalid selection. Please choose a valid number from the search results.");
            }

            const selectedMovie = searchResults.results[selectedMovieIndex];
            const link = selectedMovie.link;

            // Step 4: Fetch movie details from the selected movie's link using the new API
            const movieDetails = await fetchJson(`${movieInfoApiUrl}${encodeURIComponent(link)}`);
            if (!movieDetails || !movieDetails.status || !movieDetails.result) {
                return reply("Movie details not found or invalid link provided.");
            }

            const movie = movieDetails.result;
            let movieMessage = `☘️ *${movie.title}*\n\n`;
            movieMessage += `🧿 Release Date:➜ ${movie.release_date}\n\n`;
            movieMessage += `🌍 Country:➜ ${movie.country}\n\n`;
            movieMessage += `⏱️ Duration:➜ ${movie.duration}\n\n`;
            movieMessage += `🎀 Categories:➜ ${movie.genres}\n\n`;
            movieMessage += `⭐ IMDB:➜ ${movie.IMDb_Rating}\n\n`;
            movieMessage += `🤵‍♂️ Director:➜ ${movie.director.name}\n\n`;
            movieMessage += `🔢 Reply below number for download options:\n\n`;
            movieMessage += `*1 - 480p*\n`;
            movieMessage += `*2 - 720p*\n`;
            movieMessage += `*3 - 1080p*\n\n`;
            movieMessage += `*ᴍᴏᴠɪᴇ  ʙʏ ᴍᴏᴠɪᴇ x*\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ - ɴᴇᴛʜᴜᴍᴀx ʏᴛ*`;

            const imageUrl = movie.images && movie.images.length > 0 ? movie.images[0] : '';

            // Step 5: Send movie details with download options
            const movieDetailsMessage = await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: movieMessage
            });

            // Step 6: Remove the message listener to prevent re-sending of the movie message
            conn.ev.off("messages.upsert", messageListener);

            // Step 7: Listener for user's quality selection
            const qualityListener = async (update) => {
                const message = update.messages[0];
                if (!message.message || !message.message.extendedTextMessage) return;

                const userReply = message.message.extendedTextMessage.text.trim();

                if (message.message.extendedTextMessage.contextInfo.stanzaId === movieDetailsMessage.key.id) {
                    let quality;
                    if (userReply === '1') quality = "480p";
                    else if (userReply === '2') quality = "720p";
                    else if (userReply === '3') quality = "1080p";
                    else {
                        await conn.sendMessage(from, {
                            react: { text: '❌', key: mek.key }
                        });
                        return reply("Invalid option. Please select from 480p, 720p, or 1080p.");
                    }

                    try {
                        // Fetch the download link using the movie download API
                        const directLink = await fetchJson(`${movieDownloadApiUrl}${encodeURIComponent(link)}`);
                        if (directLink) {
                            const qualityLink = directLink[quality];  // Assuming the API returns quality links
                            if (qualityLink) {
                                await conn.sendMessage(from, {
                                    document: { url: qualityLink },
                                    mimetype: 'video/mp4',
                                    fileName: `🎬 ${movie.title} (${quality}).mkv`,
                                    caption: `${movie.title}\n\n*ᴍᴏᴠɪᴇ  ʙʏ ᴍᴏᴠɪᴇ x*\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ - ɴᴇᴛʜᴜᴍᴀx ʏᴛ*`
                                });

                                // React with success
                                await conn.sendMessage(from, {
                                    react: { text: '✅', key: mek.key }
                                });
                            } else {
                                await conn.sendMessage(from, {
                                    react: { text: '❌', key: mek.key }
                                });
                                return reply(`Could not find the download link for ${quality}.`);
                            }
                        } else {
                            await conn.sendMessage(from, {
                                react: { text: '❌', key: mek.key }
                            });
                            return reply("Could not fetch the download link.");
                        }
                    } catch (error) {
                        console.log(error);
                        await conn.sendMessage(from, {
                            react: { text: '❌', key: mek.key }
                        });
                        return reply("Error occurred while fetching the download link.");
                    }
                }
            };

            // Step 8: Attach listener for quality selection
            conn.ev.on("messages.upsert", qualityListener);

        };
        // Attach the listener to handle user's number selection
        conn.ev.on("messages.upsert", messageListener);

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, {
            react: { text: '❌', key: mek.key }
        });
        return reply(`Error occurred: ${error.message || error}`);
    }
});
