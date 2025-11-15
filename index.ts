import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user!.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'hello') {
    message.reply('Hi there! 👋 I am your friendly bot.');
  }
});

client.login(process.env.DISCORD_TOKEN);
