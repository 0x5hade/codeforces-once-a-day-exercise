const { SlashCommandBuilder } = require("discord.js");
const { getTask } = require('../../utils.js');

module.exports = {
  data: new SlashCommandBuilder().setName('start').setDescription('Starts the bot'),
  async execute(interaction) {
    const task = getTask();
    if (task.getStatus() == 'idle' || task.getStatus() == 'running') {
      await interaction.reply(`Program already started. Next run: ${task.getNextRun().toString()}`)
    } else {
      try {
        task.start()
        await interaction.reply(`Program was started by ${interaction.user.username}!`);
      } catch (error) {
        console.error("Error:", error);
        await interaction.reply('Failed to start task.')
      }
    }
  }
}


