'use strict';
const express = require('express');
const db = require('./config/database');
const cors = require('cors');
const bodyparser = require('body-parser');
var app = express();
app.use(cors()) 
app.use(express.json());
const joueurrouter = require('./routes/routerjoueur');
const WebSockets = require('./websocket');
app.use('/joueurs', joueurrouter);


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/inscription.html')
});
app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/public/login.html')
});
app.get('/play', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
});
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/js',express.static(__dirname + '/public/js'));
app.use('/img',express.static(__dirname + '/public/img'));

app.use(bodyparser.urlencoded({extended:true})); // pour lire les formats json
var server = require('http').createServer(app);
global.io = require('socket.io')(server);
global.io.on('connection', WebSockets.connection);


server.listen(3200, function(err) {
    if(err) 
    console.log('erreur', err);
    else
    console.log('Server is running at http://localhost:3200');
});