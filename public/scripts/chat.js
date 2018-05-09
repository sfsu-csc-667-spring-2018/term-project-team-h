$(function () {
    const socket = io();
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });

    socket.on('bet', function(data){
        console.log("recieved");
        bet({player: data.player, amount: data.amount});
    });

});