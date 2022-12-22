const users=[];


//Join user to Chat
function joinUser(id,username,room) {
    const user={id,username,room};

    users.push(user);

    return user;
}

//Get current user

function getCurrentUser(id) {
    return users.find(user=>user.id===id);
}  
//user leaves Chat

function userLeave(id) {
    const index=users.findIndex(user=>user.id===id);
    if(index!==-1){
        return users.splice(index,1);
    }
}
//Get room Users 
function getRoomUsers(room) {
    return users.filter
}
module.exports={
    joinUser,
    getCurrentUser

}