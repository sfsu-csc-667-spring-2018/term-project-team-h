$(function () {
    const socket = io();
    $('form').submit(function(){
        socket.emit('chat message', {msg: $('#m').val(), player: player});
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(data){
        $('#messages').append($('<li>').text(data.player + ": " + data.msg));
    });



});