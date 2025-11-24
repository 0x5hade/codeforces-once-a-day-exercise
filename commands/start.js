const { SlashCommandBuilder } = require("discord.js");
const { task } = require("../utils.js");


module.exports = {
  data: new SlashCommandBuilder().setName('start').setDescription('Starts the bot'),
  async execute(interaction) {
    await task.start();
    await interaction.reply(`Server was started by ${interaction.user.username}!`);
  }
}

