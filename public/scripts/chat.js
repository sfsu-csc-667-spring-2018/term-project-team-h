$(function () {

    //used to build object for later use
    // var myInfo = {
    //     userNames: user
    // }

    const socket = io();


    $('form').submit(function(){
        //Getting Hidden values of the player
        var user = $('#userID').text();
        socket.emit('chat message', {msg: $('#m').val(), user: user});
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(data){
        let messages = $('#messages');
        messages.append($('<li>').text(data.user + ": " + data.msg));
        if(messages.children().length > 20){
            messages[0].removeChild(messages.children()[0]);
        }
    });
});