import { Client, GatewayIntentBits } from 'discord.js';
import { commands } from './commands';
import { config } from './config';
import { deployCommands } from './deploy-commands';
import { Logger } from './logger';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const logger = Logger.getInstance();

if (!client.user) {
  throw new Error('Client user is null');
}

client.once('ready', () => {
  if (!client.user) {
    throw new Error('Client user is null');
  }
  logger.info(`Logged in as ${client.user.tag}`);
});

client.on('guildCreate', (guild) => {
  (async () => {
    await deployCommands({ guildId: guild.id });
  })().catch((error: unknown) => {
    logger.error('guildCreate', error);
  });
});

client.on('interactionCreate', (interaction) => {
  (async () => {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    await commands[commandName as keyof typeof commands].execute(interaction);
  })().catch((error: unknown) => {
    logger.error('interactionCreate', error);
  });
});

client.login(config.DISCORD_TOKEN).catch((error: unknown) => {
  logger.error('login error', error);
});
