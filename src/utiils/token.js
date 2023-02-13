const token = () => {
    const number = Math.random().toString(16).substring(2) + Math.random().toString(16).substr(2);
    const randomNumb = number.substring(0, 16);
    return randomNumb;
};

module.exports = token;