const { request } = require('undici');
const { EmbedBuilder } = require('discord.js');

const cron = require('node-cron');

require('dotenv').config();

const problemTags = [
  "2-sat",
  "binary search",
  "bitmasks",
  "brute force",
  "chinese remainder theorem",
  "combinatorics",
  "constructive algorithms",
  "data structures",
  "dfs and similar",
  "divide and conquer",
  "dp",
  "dsu",
  "expression parsing",
  "fft",
  "flows",
  "games",
  "geometry",
  "graph matchings",
  "graphs",
  "greedy",
  "hashing",
  "implementation",
  "interactive",
  "math",
  "matrices",
  "meet-in-the-middle",
  "number theory",
  "probabilities",
  "schedules",
  "shortest paths",
  "sortings",
  "string suffix structures",
  "strings",
  "ternary search",
  "trees",
  "two pointers"
];

async function fetchProblem() {
  const max = problemTags.length;

  const tag = Math.floor(Math.random() * max);

  const codeforcesApi = `https://codeforces.com/api/problemset.problems?tags=${problemTags[tag]}`;

  const { statusCode, _, body } = await request(codeforcesApi);

  if (statusCode !== 200) {
    console.error(`Error: Status Code - ${statusCode}`)
  }

  const data = await body.json();

  const problems = data.result.problems;

  const randomProblemNum = Math.floor(Math.random() * problems.length);

  const problem = problems[randomProblemNum];

  return problem;
}

let task;

const startCronJob = (client) => {

  // This schedules it to run at minute 0 of the hour 18 of each day (6 pm everyday).
  task = cron.schedule('0 18 * * *', async () => {
    const problem = await fetchProblem();

    const problemUrl = 'https://codeforces.com/contest/' + problem.contestId + '/problem/' + problem.index;

    try {
      const channel = client.channels.cache.get(process.env.CHANNEL_ID);

      if (!channel) {
        console.error('Error: Channel not found!')
      } else {
        const embed = new EmbedBuilder()
          .setTitle(problem.name)
          .setDescription(problem.index + '\n' + problem.rating)
          .setURL(problemUrl)
          .setColor(0xd672e6)
        await channel.send({ embeds: [embed] });

      }
    } catch (error) {
      console.error("Error:", error);
    }

  }, {
    name: "problem-fetcher",
    timezone: "Africa/Cairo"
  });
  task.start();
}

const getTask = () => { return task };

module.exports = { startCronJob, getTask };




