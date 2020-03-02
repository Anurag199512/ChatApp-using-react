const express=require('express');
const app=express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port=process.env.PORT|| 5000;
const utils=require('./utils');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
    server.listen(port,()=>{
        console.log(`Worker ${process.pid} started`);
    });
  }


app.get('/', function(req, res){
	res.send('Server is running....');
});

io.sockets.on("connection",function(socket){
    socket.on("join",({name,room},callback)=>{

        if(room && utils.getUsersInRoom(room).length==2)
            return callback('Already 2 users are present you cannot join.');
   
        const {error,user}=utils.addUser(socket.id,name,room);
       
        if(error)
            return callback(error);
        
        
        socket.emit('greetMessage', { user: 'admin', text: `${user.name},  joined the room`});
        socket.broadcast.to(user.room).emit('greetMessage', { user: 'admin', text: `${user.name} has joined the room!` });

        socket.join(user.room);

        callback()
    })

    socket.on("newMessage",(msg,callback)=>{
        const user=utils.getUser(socket.id);
      
        if(user)
            io.to(user.room).emit('greetMessage', { user: user.name, text: msg });
        callback();

    })

    socket.on('disconnect', function () {
        const user = utils.removeUser(socket.id);

        if(user) {
          socket.broadcast.to(user.room).emit('greetMessage', { user: 'Admin', text: `${user.name} has left.` });
        }
    });

})
