var player = "player", leftPlayer = "leftplayer", rightPlayer = "rightplayer", topPlayer = "shit";
var currentbet = 0, blind = 0, bigBlindPlayer = "", playerIndex = 0;
let socket;

$(document).ready(function(){
    socket = io();

    addPlayer({name: "hello", index: 1});
    addPlayer({name: "top", index: 2});
    addPlayer({name: "right", index: 3});
    player = Math.random() * 100;
    socket.emit('new player', player);

    document.getElementById("bet").addEventListener("click", function(){
        var amount = document.getElementById("rangevalue").value;
        socket.emit('bet', {player: player, amount: amount});
    });

    document.getElementById("fold").addEventListener("click", function(){
        socket.emit('fold', {player: player});
        disableButtons();
    });

    document.getElementById("check").addEventListener("click", function(){
        socket.emit('check', player);
    });
    document.getElementById("call").addEventListener("click", function(){
        socket.emit('call', {player: player});

    });


    document.getElementById("slider").addEventListener("change", function() {
        if (document.getElementById("slider").value / 100 * parseInt(document.getElementById("playeramount").innerHTML) < currentbet + 25) {
            document.getElementById("rangevalue").value = currentbet + 25;
        } else {
            document.getElementById("rangevalue").value = document.getElementById("slider").value / 100 * parseInt(document.getElementById("playeramount").innerHTML);
        }
    });
});


function addPlayer(data){
    let check = data.index - playerIndex;
    switch(check){
        case 1:
        case -3:
            if(data.name != leftPlayer) {
                leftPlayer = data.name;
                document.getElementById("left-name").innerHTML = "<h6><strong>" + data.name + "</strong></h6>";
            }
            break;
        case 2:
        case -2:
            if(data.name != topPlayer){
            topPlayer = data.name;
            document.getElementById("top-name").innerHTML = "<h6><strong>" + data.name + "</strong></h6>";
            }
            break;
        case 3:
        case -1:
            if(data.name != rightPlayer) {
                rightPlayer = data.name;
                document.getElementById("right-name").innerHTML = "<h6><strong>" + data.name + "</strong></h6>";
            }
            break;

    }
}

function setFlop(cards){
    var card1 = "/images/" + cards.onevalue + "_of_" + cards.onesuit + ".png";
    var card2 = "/images/" + cards.twovalue + "_of_" + cards.twosuit + ".png";
    var card3 = "/images/" + cards.threevalue + "_of_" + cards.threesuit + ".png";
    document.getElementById("flop1").setAttribute('src', card1);
    document.getElementById("flop2").setAttribute('src', card2);
    document.getElementById("flop3").setAttribute('src', card3);
}


function setTurn(cards){
    var card = "/images/" + cards.value + "_of_" + cards.suit + ".png";
    document.getElementById("turn").setAttribute('src', card);
}

function setRiver(cards){
    var card = "/images/" + cards.value + "_of_" + cards.suit + ".png";
    document.getElementById("river").setAttribute('src', card);
}

function showPlayerCards(cards){
    var leftcard = "/images/" + cards.leftvalue + "_of_" + cards.leftsuit + ".png";
    var rightcard = "/images/" + cards.rightvalue + "_of_" + cards.rightsuit + ".png";

    switch(cards.player){
        case player:
            document.getElementById("player-left-card").setAttribute('src', leftcard);
            document.getElementById("player-right-card").setAttribute('src', rightcard);
        case topPlayer:
            document.getElementById("opponents-top-cards").children[0].setAttribute('src', leftcard);
            document.getElementById("opponents-top-cards").children[1].setAttribute('src', rightcard);
        case leftPlayer:
            document.getElementById("opponents-left-cards").children[0].setAttribute('src', leftcard);
            document.getElementById("opponents-left-cards").children[1].setAttribute('src', rightcard);
        case rightPlayer:
            document.getElementById("opponents-right-cards").children[0].setAttribute('src', leftcard);
            document.getElementById("opponents-right-cards").children[1].setAttribute('src', rightcard);
    }
}

function setLastAction(text){
    document.getElementById("lastaction").innerHTML = text;
}

function setPotAmount(text){
    document.getElementById("potamount").innerHTML = text;
}

function setPlayerBank(data){
    switch(data.player){

        case player:
            var playerBank = parseInt(document.getElementById("playeramount").innerHTML) + data.amount;
            document.getElementById("playeramount").innerHTML =  playerBank;
            break;
        case leftPlayer:
            var playerBank = parseInt(document.getElementById("leftamount").innerHTML) + data.amount;
            document.getElementById("leftamount").innerHTML =  playerBank;
            break;
        case rightPlayer:
            var playerBank = parseInt(document.getElementById("rightamount").innerHTML) + data.amount;
            document.getElementById("rightamount").innerHTML =  playerBank;
            break;
        case topPlayer:
            var playerBank = parseInt(document.getElementById("topamount").innerHTML) + data.amount;
            document.getElementById("topamount").innerHTML =  playerBank;
    }
}

function disableButtons(){
    document.getElementById("check").disabled = true;
    document.getElementById("call").disabled = true;
    document.getElementById("fold").disabled = true;
    document.getElementById("bet").disabled = true;
}
function setAction(data){
    switch(data.player){
        case leftPlayer:
            document.getElementById("leftaction").innerHTML =  data.action + " " + data.amount;
            break;
        case rightPlayer:
            document.getElementById("rightaction").innerHTML =  data.action + " " + data.amount;
            break;
        case topPlayer:
            document.getElementById("topaction").innerHTML =  data.action + " " + data.amount;
            break;
    }
}

//data fields: player, amount
function bet(data){
    setPlayerBank({player: data.player, amount: ( -1 * data.amount ) });
    setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + parseInt(data.amount));
    setLastAction(data.player + " Bet " + data.amount);
    setAction({player: data.player, action: "bet", amount: data.amount});
}

//data fields: player, amount
function call(data) {
    setPlayerBank({player: data.player, amount: (-1 * data.amount)});
    setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + data.amount);
    setLastAction(data.player + " Called " + data.amount);
    setAction({player: data.player, action: "called", amount: data.amount});
}

//data fields: player
function fold(data){
    setLastAction(data.player + " Folded");
    switch(data.player){
        case player:
            document.getElementById("player-left-card").style.visibility= "hidden";
            document.getElementById("player-right-card").style.visibility= "hidden";
            break;
        case topPlayer:
            document.getElementById("opponents-top-cards").children[0].style.visibility= "hidden";
            document.getElementById("opponents-top-cards").children[1].style.visibility= "hidden";
            break;
        case leftPlayer:
            document.getElementById("opponents-left-cards").children[0].style.visibility= "hidden";
            document.getElementById("opponents-left-cards").children[1].style.visibility= "hidden";
            break;
        case rightPlayer:
            document.getElementById("opponents-right-cards").children[0].style.visibility= "hidden";
            document.getElementById("opponents-right-cards").children[1].style.visibility= "hidden";
            break;
    }

    setAction({player: data.player, action: "fold", amount: ""});
}

function setPlayerTurn(currentBet){
    currentbet = currentBet;
    if(currentBet != 0){
        document.getElementById("check").disabled = true;
        document.getElementById("call").disabled = false;
        document.getElementById("fold").disabled = false;
        document.getElementById("bet").disabled = false;
    } else{
        document.getElementById("bet").disabled = false;
        document.getElementById("check").disabled = false;
        document.getElementById("call").disabled = true;
        document.getElementById("fold").disabled = false;
    }

    if (document.getElementById("slider").value / 100 * parseInt(document.getElementById("playeramount").innerHTML) < currentbet + 25) {
        document.getElementById("rangevalue").value = currentbet + 25;
    } else {
        document.getElementById("rangevalue").value = document.getElementById("slider").value / 100 * parseInt(document.getElementById("playeramount").innerHTML);
    }


}

function setBlind(number){
    blind = number;
}

function claimBlinds(name){
    switch(name){
        case player:
            if(parseInt(document.getElementById("playeramount").innerHTML) <= blind){
                setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + parseInt(document.getElementById("playeramount").innerHTML));
                setPlayerBank({player: name, amount: 0});
            }else{
                setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + blind);
                setPlayerBank({player: name, amount: parseInt(document.getElementById("playeramount").innerHTML) - blind});
            }
            break;
        case topPlayer:

            if(parseInt(document.getElementById("topamount").innerHTML) <= blind){
                setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + parseInt(document.getElementById("topamount").innerHTML));
                setPlayerBank({player: name, amount: 0});
            }else{
                setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + blind);
                setPlayerBank({player: name, amount: parseInt(document.getElementById("topamount").innerHTML) - blind});
            }
            break;
        case leftPlayer:
            if(parseInt(document.getElementById("leftamount").innerHTML) <= blind){
                setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + parseInt(document.getElementById("leftamount").innerHTML));
                setPlayerBank({player: name, amount: 0});
            }else{
                setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + blind);
                setPlayerBank({player: name, amount: parseInt(document.getElementById("leftamount").innerHTML) - blind});
            }
            break;
        case rightPlayer:
            if(parseInt(document.getElementById("rightamount").innerHTML) <= blind){
                setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + parseInt(document.getElementById("rightamount").innerHTML));
                setPlayerBank({player: name, amount: 0});
            }else{
                setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + blind);
                setPlayerBank({player: name, amount: parseInt(document.getElementById("rightamount").innerHTML) - blind});
            }
            break;
    }
}


//socket.io functions
$(function () {
    socket.on('bet', function(data){
        bet(data);
    });

    socket.on('fold', function(data){
        fold(data);
    });

    socket.on('call', function(data){
       call(data);
    });

    socket.on('players', function(data){
        console.log(data);
    });

    socket.on('users', function(data){
        for(let i = 0; i < data.length; i++){
            addPlayer({name: data[i], index: i});
        }

    });

    socket.on(player, function(data){
       playerIndex = data.playerIndex;
       console.log(playerIndex);
    });

    socket.on('setTurn', function(data){
       if(data.player == player){
           setPlayerTurn(data.amount);
           document.getElementById("turn").innerHTML = "<strong> YOUR TURN! </strong>";
           setPlayerTurn(data.amount);

       }else{
           document.getElementById('turn').innerHTML = "<strong>" + data.player + "'s Turn" + "</strong>";
           disableButtons();
       }

    });


});