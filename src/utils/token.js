const crypto = require('crypto');

function tokenGeneration() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = tokenGeneration;