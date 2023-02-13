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

  async function renewTalker(body, id) {
    const data = await readWriteFile();
    const talkIt = data.findIndex((t) => t.id === id);
    const brandTalk = { id, ...body };
    const novoInd = data.map((t, index) => {
      if (index === talkIt) {
        return brandTalk;
      }
      return t;
    });
    await fs.writeFile('src/talker.json', JSON.stringify(novoInd));
    return brandTalk;
  }

  const eraseTalker = async (id) => {
    const oldData = await readWriteFile();
    const arrayOfIds = oldData.map((e) => e.id);
    const indexToRemove = arrayOfIds.indexOf(Number(id)); 
    oldData.splice(indexToRemove, 1);
    await fs.writeFile('src/talker.json', JSON.stringify(oldData));
};

module.exports = { 
    readWriteFile,
    sendTalker,
    renewTalker,
    eraseTalker,
 };
