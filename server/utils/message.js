/* jshint esversion: 6 */

var generateMessage = (from, text) => {
    return {
        from,
        text,
        timestamp: new Date().getTime()
    };
};

module.exports = { generateMessage };