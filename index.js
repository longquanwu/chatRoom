var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});

var userNames = {};
var countUser = 0;

io.on('connection', function (socket) {
    console.log('一个新的socket连接');

    socket.on('login', function(obj){
        socket.name = obj.userid;

        if(!userNames.hasOwnProperty(obj.userid)) {
            userNames[obj.userid] = obj.username;
            countUser++;
        }
        io.emit('login', {'userNames': userNames, 'countUser': countUser, 'user': obj});
        console.log(obj.username + '加入聊天室');
    })

    socket.on('logout', function(){
        if(userNames.hasOwnProperty(obj.userid)){
            var name = userNames[socket.name];
            delete userNames[socket.name];
            countUser--;
            io.emit('logout', {'userNames': userNames, 'countUser': countUser, 'user': name});
            console.log(name + '退出了聊天室');
        }
    })

    socket.on('message', function(obj){
        io.emit('message', obj);
        console.log(obj.username + '说：' + obj.content);
    })
});

http.listen(2333, function(){
    console.log('listening on *:2333');
});
