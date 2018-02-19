var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMsg', function (msg) {
    console.log('newMsg:', msg);
    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    $('#messages').append(li);
});


$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMsg', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    });
});