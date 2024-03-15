module.exports.config = {
    name: "gpt4",
    version: "1.0.0",
    role: 1,
    credits: "KENLIEPLAYS",
    usePrefix: false,
    description: "AI gpt + CONVERSATIONS CONTINUES",
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
    if (!args[0]) return api.sendMessage("▪︎Ex: gpt4 Tu es là?", tid, mid);
    try {
        const res = await axios.get(`https://ai-tools.replit.app/gpt?prompt=${content}&uid=${encodeURIComponent(userId)}`);
        const respond = res.data.gpt4;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
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
