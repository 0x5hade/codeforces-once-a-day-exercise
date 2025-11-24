const { SlashCommandBuilder } = require("discord.js");
const { task } = require("../utils.js");


module.exports = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Stops the bot'),
  async execute(interaction) {
    await task.stop();
    await interaction.reply(`Server was started by ${interaction.user.username}!`);
  }
}

