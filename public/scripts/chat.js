$(function () {

    //Getting Hidden values of the player
    var user = $('#userID').text();

    //used to build object for later use
    var myInfo = {
        userNames: user
    }


    const socket = io();
    $('form').submit(function(){
        socket.emit('chat message', {msg: $('#m').val(), player: player});
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(data){
        let messages = $('#messages');
        messages.append($('<li>').text(data.player + ": " + data.msg));
        if(messages.children().length > 20){
            messages[0].removeChild(messages.children()[0]);
        }
    });

});