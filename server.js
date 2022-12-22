const express=require('express');
const path=require('path');
const app=express();
const socketio=require('socket.io');
const http=require('http');

const server= http.createServer(app);

const io=socketio(server);

const formatMessage = require('./utils/messages')

const {joinUser,getCurrentUser}=require('./utils/user');


//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

const botName='ChatCord Bot';
//When a client collects
io.on('connection',socket=>{
    socket.on('joinRoom',({username,room})=>{
        const user=joinUser(socket.id,username,room);
socket.join(user.room);

    //Welcome Current user          
    socket.emit('message',formatMessage(botName,'Welcome to ChatCord!'));

    //Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the Chat`));

    
    });


    //listen for Chat message
    socket.on('chatMessage',msg=>{
        const user=getCurrentUser(socket.id);
        // console.log(msg);
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    });
        //Runs when client disconnects
    socket.on('disconnect', () =>{
        io.emit('message',formatMessage(botName,'A user has left the chat'));
    })
})
const PORT = 3000 || process.env.PORT;
server.listen(PORT,()=> console.log("Server started")
);