var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMsg', function (msg) {
    var formattedTime = moment(msg.timestamp).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: msg.from,
        text: msg.text,
        timestamp: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    // // console.log('newMsg:', msg);
    // var li = $('<li></li>');
    // li.text(`${msg.from} (${formattedTime}): ${msg.text}`);

    // $('#messages').append(li);
});

socket.on('newLocationMessage', function (msg) {
    var formattedTime = moment(msg.timestamp).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: msg.from,
        url: msg.url,
        timestamp: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My current location</a>');

    // li.text(`${msg.from} (${formattedTime}): `);
    // a.attr('href', msg.url);
    // li.append(a);
    // $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]');

    socket.emit('createMsg', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (pos) {
        locationButton.removeAttr('disabled').text('Sending location');
        socket.emit('createLocationMessage', {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Sending location');
        alert('Unable to fetch location.');
    });
});