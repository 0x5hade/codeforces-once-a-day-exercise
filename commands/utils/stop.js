const { SlashCommandBuilder } = require("discord.js");
const { getTask } = require('../../utils.js');

module.exports = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Stops the bot'),
  async execute(interaction) {
    const task = getTask();
    if (task.getStatus() == 'stopped') {
      await interaction.reply(`Program already stopped, to restart it use /start`)
    } else {
      try {
        task.stop()
        await interaction.reply(`Program was stopped by ${interaction.user.username}!`);
      } catch (error) {
        console.error("Error:", error);
        await interaction.reply('Failed to stop task.')
      }
    }
  }
}

