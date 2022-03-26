exports.bot = {
    token: process.env.DISCORD_BOT_TOKEN || "",
    botName: process.env.DISCORD_BOT_NAME || "Discord Bot",
    exitOnUncaughtException: JSON.parse(process.env.DISCORD_BOT_EXIT_EXCEPTION) || true,
    threadFromImageChannels: JSON.parse(process.env.THREAD_FROM_IMAGE_CHANNELS) || [],
    noGifChannels: JSON.parse(process.env.NO_GIF_CHANNELS) || []
}