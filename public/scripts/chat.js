$(function () {


    const socket = io();

    $('#chat_messenger').submit(function () {
        var user = $('#userID').text();
        console.log('USer', user);
        socket.emit('chat message', {message: $('#m').val(), user: user});
        $('#m').val('');
        return false;
    });



    socket.on('chat message', function (O) {
        // console.log('user', myInfo.userName);
        // console.log('MSG',msg);
        $('#messages').append($('<li>').text(O.user + ": " + O.message));

    });

    
});