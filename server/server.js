/* jshint esversion: 6 */
const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socket(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMsg', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMsg', generateMessage('Admin', 'New user joined'));

    socket.on('createMsg', (msg) => {
        console.log('createMsg:', msg);
        io.emit('newMsg', generateMessage(msg.from, msg.text));

        // socket.broadcast.emit('newMsg', {
        //     from: msg.from,
        //     text: msg.text,
        //     timestamp: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});