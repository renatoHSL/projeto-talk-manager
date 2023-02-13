const fs = require('fs/promises');

const readWriteFile = async () => {
    try {
        const aTalker = await fs.readFile('src/talker.json', 'utf-8');
        return JSON.parse(aTalker);
    } catch (error) {
        console.error(error.message);
    }
};

async function sendTalker(body) {
    const data = await readWriteFile();
    const id = data[data.length - 1].id + 1;
    const newPerson = {
      id,
      ...body,
    };
    data.push(newPerson);
    await fs.writeFile('src/talker.json', JSON.stringify(data));
    return newPerson;
  }

module.exports = { 
    readWriteFile,
    sendTalker,
 };
