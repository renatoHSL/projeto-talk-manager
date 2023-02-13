const token = () => {
    const randomNumberToken = Math.random().toString(36).substring(2, 18); 
    return randomNumberToken;
};

module.exports = token;