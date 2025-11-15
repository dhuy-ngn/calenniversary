import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('yearly')
  .setDescription('Get yearly summary of your anniversaries');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(
    'Yearly summary feature is under development. Stay tuned!',
  );
}
