var generateMessage = (from, text) => {
    return {
        from,
        text,
        timestamp: new Date().getTime()
    };
};

var generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        timestamp: new Date().getTime()
    };
};

module.exports = { generateMessage, generateLocationMessage };