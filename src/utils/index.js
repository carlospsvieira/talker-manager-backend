const fs = require('fs').promises;
const path = require('path');

async function getTalkers() {
  try {
    const request = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const response = await JSON.parse(request);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getTalkerById(id) {
  const talkers = await getTalkers();
  const wantedTalker = talkers.find((talker) => talker.id === Number(id));
  return wantedTalker;
}

module.exports = { getTalkers, getTalkerById };