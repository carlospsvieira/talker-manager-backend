const fs = require('fs').promises;
const path = require('path');

// display all talkers //
async function allTalkers() {
  try {
    const request = await fs.readFile(
      path.resolve(__dirname, '../talker.json'),
    );
    const response = await JSON.parse(request);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// generate a new token of 16 char when called //
function generateToken() {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 16; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return token;
}

async function fsWriteFile(item) {
  const requestTalkers = await allTalkers();
  requestTalkers.push(item);
  const response = await fs.writeFile(
    path.resolve(__dirname, '../talker.json'),
    JSON.stringify(requestTalkers, null, 2),
  );
  return response;
}

async function fsWriteNewUponDelete(id) {
  const requestTalkers = await allTalkers();
  const newList = requestTalkers.filter((talker) => talker.id !== Number(id));
  const response = await fs.writeFile(
    path.resolve(__dirname, '../talker.json'),
    JSON.stringify(newList, null, 2),
  );
  return response;
}

module.exports = { allTalkers, generateToken, fsWriteFile, fsWriteNewUponDelete };
