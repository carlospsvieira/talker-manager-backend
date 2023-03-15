const fs = require('fs').promises;
const path = require('path');

async function getTalkers() {
  try {
    const request = await fs.readFile(path.resolve(__dirname, './talker.json'));
    const response = await JSON.parse(request);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = { getTalkers };