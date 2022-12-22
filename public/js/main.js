const chatForm=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');

//get Username and room from URL
const {username,room} =Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
const socket=io();


// Join Chat Room
socket.on('joinRoom',{username,room});
//Message from Server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);

    //Scroll Down when we receive a new message
    chatMessages.scrollTop=chatMessages.scrollHeight;
})

//message submit
chatForm.addEventListener('submit',(e)=>{
e.preventDefault();
const msg = e.target.elements.msg.value;
console.log(msg);

e.target.elements.msg.value='';
e.target.elements.msg.focus();
//Emit to server
socket.emit('chatMessage',msg);
});

//out message to DOM
function outputMessage(message){

    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML =`						<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}