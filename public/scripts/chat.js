$(function () {

    //Getting Hidden values of the player
    var user = $('#userID').text();

    //used to build object for later use
    var myInfo = {
        userNames: user
    }
    const userName = myInfo.userNames


    const socket = io();
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(msg){
        // console.log('user', myInfo.userName);
        // console.log('MSG',msg);
        $('#messages').append($('<li>').text(userName + ": " + msg));
    });



});