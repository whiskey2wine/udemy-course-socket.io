var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey. This is Bacon.',
        timestamp: new Date()
    });

    socket.emit('createMsg', {
        from: 'Toon',
        msg: 'My name is Bacon.',
        timestamp: new Date()
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMsg', function (msg) {
    console.log('newMsg:', msg);
});