import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('test')
  .setDescription(
    'Test command to check if the bot is adding missing commands',
  );

export async function execute(interaction: CommandInteraction) {
  return interaction.reply('Test command executed successfully!');
}
