let player = "";
let socket;

$(document).ready(function(){
    socket = io();

    document.getElementById('create').addEventListener('click', function(data){
       //TODO: POST REQUEST TO CREATE NEW GAME
        console.log("create");
    });

    document.getElementById('join').addEventListener('click', function(data){
        //TODO: POST REQUEST TO CREATE NEW GAME
        console.log("join");
    });
});