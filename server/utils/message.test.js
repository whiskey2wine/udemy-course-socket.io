var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(typeof message.timestamp).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Test';
        var lat = 17;
        var lng = 5;
        var url = 'https://www.google.com/maps?q=17,5';
        var message = generateLocationMessage(from, lat, lng);

        expect(typeof message.timestamp).toBe('number');
        expect(message).toMatchObject({
            from,
            url
        });

    });
});