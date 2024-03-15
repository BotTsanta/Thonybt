const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

module.exports.config = {
    name: "say",
    aliases: ["speak", "parle"],
    version: "1.0.0",
    role: 0,
    credits: "cliff",
    description: "Text to voice speech messages",
    hasPrefix: false,
    usages: `Text to speech messages`,
    cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { createReadStream, unlinkSync } = fs;
        const { resolve } = path;

        let content = (event.type === "message_reply") ? event.messageReply.body : args.join(" ");

        // Check if content is empty
        if (!content.trim()) {
            return api.sendMessage("🔄Text to audio\n\n ▪︎Code: Say: [fr] [texte] \n\n ▪︎Ex: Say fr Salut, Bienvenue chez-moi\n\n ▪︎NB: Afaka soloina langue hafa ilay [fr] io\n fr = Français \n en = English \n zh = Chinois \n es = espagnol sns...", event.threadID, event.messageID);
        }

        // Add reaction while waiting
        api.setMessageReaction("⏳", event.messageID, (err) => {}, true);

        let languageToSay = detectLanguage(content);
        let msg = content.slice(languageToSay.length).trim();

        const filePath = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
        await downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, filePath);

        return api.sendMessage({ attachment: createReadStream(filePath) }, event.threadID, () => unlinkSync(filePath), event.messageID);
    } catch (error) {
        console.error(error);
    }
};

function detectLanguage(content) {
    const supportedLanguages = ["ru", "en", "ko", "ja", "tl", "fr", "zh", "es"];
    for (const lang of supportedLanguages) {
        if (content.startsWith(lang)) {
            return lang;
        }
    }
    // Default language if not specified or not supported
    return "fr";
}

async function downloadFile(url, filePath) {
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}
