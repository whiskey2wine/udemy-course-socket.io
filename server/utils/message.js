var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        timestamp: moment().valueOf()
    };
};

var generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        timestamp: moment().valueOf()
    };
};

module.exports = { generateMessage, generateLocationMessage };