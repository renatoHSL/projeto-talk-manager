const fs = require('fs/promises');

const readWriteFile = async () => {
    try {
        const aTalker = await fs.readFile('src/talker.json', 'utf-8');
        return JSON.parse(aTalker);
    } catch (error) {
        return null;
    }
};

async function sendTalker(body) {
    const talkers = await readWriteFile();
    const id = talkers[talkers.length - 1].id + 1;
    const newTalker = {
      id,
      ...body,
    };
    talkers.push(newTalker);
    await fs.writeFile('src/talker.json', JSON.stringify(talkers));
    return newTalker;
  }

module.exports = { 
    readWriteFile,
    sendTalker,
 };
