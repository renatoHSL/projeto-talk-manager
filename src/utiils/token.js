const token = () => {
    const random = Math.random().toString(16).substring(2) + Math.random().toString(16);
    return random;
};

module.exports = token;