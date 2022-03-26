# The Community Discord Bot

This is a discord bot derived from the [Lospec Discord Bot](https://github.com/jdonaldsonart/lospec-discord-bot) but with a subset of functionality, made for the Justin Donaldson Community Discord server. As such, if you want documentation, please check out the [local fork](https://github.com/jdonaldsonart/lospec-discord-bot) or the [official repository](https://github.com/lospec/lospec-discord-bot). Thanks Skeddles & the Lospec crew!

It's been restructured to work with digital ocean environment keys for configuration and expects the following exports to be set:

```bash
export DISCORD_BOT_TOKEN
export DISCORD_BOT_NAME
export DISCORD_BOT_EXIT_EXCEPTION
export THREAD_FROM_IMAGE_CHANNELS
export NO_GIF_CHANNELS
```