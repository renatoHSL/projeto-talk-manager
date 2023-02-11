const fs = require('fs/promises');

const readWriteFile = async () => {
    try {
        const aTalker = await fs.readFile('src/talker.json', 'utf-8');
        return JSON.parse(aTalker);
    } catch (error) {
        return null;
    }
};

module.exports = { readWriteFile };
