module.exports.config = {
    name: "Mayra",
    version: "1.0.0",
    role: 0,
    credits: "KENLIEPLAYS",
    usePrefix: false,
    description: "Tsanta + CONVERSATIONS CONTINUES",
    commandCategory: "ai",
    usages: "[ask]",
    cooldown: 10,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const userId = event.senderID;
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
        mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("▪︎Ex: Mayra Tu es là?", tid, mid);
    try {
        // Set ⏳ reaction before making the API call
        api.setMessageReaction("⏳", mid, (err) => {}, true);
        const res = await axios.get(`https://ai-tools.replit.app/gpt?prompt=${content}&uid=${encodeURIComponent(userId)}`);
        // Remove ⏳ reaction when the response is received
        api.setMessageReaction("✅", mid, (err) => {}, true);
        const respond = res.data.gpt4;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                    api.setMessageReaction("❎", mid, (err) => {}, true);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};
