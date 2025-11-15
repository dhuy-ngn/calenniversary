import { Client, GatewayIntentBits } from "discord.js";
import { commands } from "./commands";
import { config } from "./config";
import { deployCommands } from "./deploy-commands";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

if (!client.user) {
  throw new Error("Client user is null");
}

client.once("ready", () => {
  if (!client.user) {
    throw new Error("Client user is null");
  }
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("guildCreate", (guild) => {
  (async () => {
    await deployCommands({ guildId: guild.id });
  })().catch((error: unknown) => {
    console.error("Failed to deploy commands on guildCreate:", error);
  });
});

client.on("interactionCreate", (interaction) => {
  (async () => {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    await commands[commandName as keyof typeof commands].execute(interaction);
  })().catch((error: unknown) => {
    console.error("Failed to handle interactionCreate:", error);
  });
});

client.login(config.DISCORD_TOKEN).catch((error: unknown) => {
  console.error("Failed to login:", error);
});
