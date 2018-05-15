let player = "", leftPlayer = "", rightPlayer = "", topPlayer = "";
let socket;
let playerIndex = 0;

//DB VALUES
let table = 0;


$(document).ready(function(){

    let hand1 = sortHand([{value: 1, suit: "spades"},{value: 1, suit: "diamonds"}, {value: 3, suit: "spades"}, {value: 4, suit: "clubs"}, {value: 13, suit: "clovers"}, {value: 9, suit:"clubs"}, {value: 11, suit: "diamonds"}]);
    let hand2 = sortHand([{value: 1, suit: "spades"},{value: 1, suit: "diamonds"}, {value: 3, suit: "spades"}, {value: 4, suit: "clubs"}, {value: 13, suit: "clovers"}, {value: 9, suit:"clubs"}, {value: 11, suit: "diamonds"}]);
    let hand3 = sortHand([{value: 7, suit: "spades"},{value: 1, suit: "spades"}, {value: 7, suit: "spades"}, {value: 10, suit: "spades"}, {value: 13, suit: "spades"}, {value: 9, suit:"clubs"}, {value: 2, suit: "diamonds"}]);
    let hand4 = sortHand([{value: 7, suit: "spades"},{value: 1, suit: "diamonds"}, {value: 7, suit: "spades"}, {value: 10, suit: "clubs"}, {value: 13, suit: "clovers"}, {value: 9, suit:"clubs"}, {value: 2, suit: "diamonds"}]);

    console.log(evaluateHand(hand1));
    console.log(compareHands([evaluateHand(hand1),  evaluateHand(hand2)]));

    player = Math.random()*100;

    socket = io();
    //Player and Table will given body of get request after user clicks create game/join game
    table = 1;
    socket.emit('new player', {player: player, table: table});
    
    
    //Player Controls
    document.getElementById("bet").addEventListener("click", function(){

        let amount = document.getElementById("rangevalue").value;
        socket.emit('bet', {player: player, amount: amount, table: table});
        disableButtons();

    });

    document.getElementById("fold").addEventListener("click", function(){
        socket.emit('fold', {player: player, table: table});
        disableButtons();
    });

    document.getElementById("check").addEventListener("click", function(){
        socket.emit('check', {player: player, table: table});
        disableButtons();
    });
    document.getElementById("call").addEventListener("click", function(){
        socket.emit('call', {player: player, table: table})
        disableButtons();

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
                leftPlayer = data.name;
                document.getElementById("left-name").innerHTML = "<h6><strong>" + data.name + "</strong></h6>";

            break;
        case 2:
        case -2:
            topPlayer = data.name;
            document.getElementById("top-name").innerHTML = "<h6><strong>" + data.name + "</strong></h6>";
            break;
        case 3:
        case -1:
                rightPlayer = data.name;
                document.getElementById("right-name").innerHTML = "<h6><strong>" + data.name + "</strong></h6>";
            break;

    }
}

function removePlayer(data){
    let check = data.index - playerIndex;
    switch(check){
        case 1:
        case -3:
            leftPlayer = "";
            //document.getElementById("left-name").innerHTML = "<h6><strong>" + EMPTY SEAT + "</strong></h6>";

            break;
        case 2:
        case -2:
            topPlayer = "";
            //document.getElementById("top-name").innerHTML = "<h6><strong>" + EMPTY SEAT + "</strong></h6>";
            break;
        case 3:
        case -1:
            rightPlayer = "";
            //document.getElementById("right-name").innerHTML = "<h6><strong>" + EMPTY SEAT + "</strong></h6>";
            break;

    }

}

function setFlopImagesImages(cards){
    let card1 = "/images/" + cards.onevalue + "_of_" + cards.onesuit + ".png";
    let card2 = "/images/" + cards.twovalue + "_of_" + cards.twosuit + ".png";
    let card3 = "/images/" + cards.threevalue + "_of_" + cards.threesuit + ".png";
    document.getElementById("flop1").setAttribute('src', card1);
    document.getElementById("flop2").setAttribute('src', card2);
    document.getElementById("flop3").setAttribute('src', card3);
}


function setTurnImages(cards){
    let card = "/images/" + cards.value + "_of_" + cards.suit + ".png";
    document.getElementById("turn").setAttribute('src', card);
}

function setRiverImages(cards){
    let card = "/images/" + cards.value + "_of_" + cards.suit + ".png";
    document.getElementById("river").setAttribute('src', card);
}

function showPlayerCards(cards){
    console.log(cards);
    let leftcard = "/images/" + cards.leftvalue + "_of_" + cards.leftsuit + ".png";
    let rightcard = "/images/" + cards.rightvalue + "_of_" + cards.rightsuit + ".png";

    switch(cards.player){
        case player:
            document.getElementById("player-left-card").setAttribute('src', leftcard);
            document.getElementById("player-right-card").setAttribute('src', rightcard);
            break;
        case topPlayer:
            document.getElementById("opponents-top-cards").children[0].setAttribute('src', leftcard);
            document.getElementById("opponents-top-cards").children[1].setAttribute('src', rightcard);
            break;
        case leftPlayer:
            document.getElementById("opponents-left-cards").children[0].setAttribute('src', leftcard);
            document.getElementById("opponents-left-cards").children[1].setAttribute('src', rightcard);
            break;
        case rightPlayer:
            document.getElementById("opponents-right-cards").children[0].setAttribute('src', leftcard);
            document.getElementById("opponents-right-cards").children[1].setAttribute('src', rightcard);
            break;
    }
}

function setLastAction(text){
    document.getElementById("lastaction").innerHTML = text;
}

function setPotAmount(text){
    document.getElementById("potamount").innerHTML = text;
}

function setPlayerBank(data){
    let playerBank;
    switch(data.player){

        case player:
            playerBank = parseInt(document.getElementById("playeramount").innerHTML) + data.amount;
            document.getElementById("playeramount").innerHTML =  playerBank;
            break;
        case leftPlayer:
            playerbank = parseInt(document.getElementById("leftamount").innerHTML) + data.amount;
            document.getElementById("leftamount").innerHTML =  playerBank;
            break;
        case rightPlayer:
            playerbank = parseInt(document.getElementById("rightamount").innerHTML) + data.amount;
            document.getElementById("rightamount").innerHTML =  playerBank;
            break;
        case topPlayer:
            playerbank = parseInt(document.getElementById("topamount").innerHTML) + data.amount;
            document.getElementById("topamount").innerHTML =  playerBank;
    }
}

function disableButtons(){
    document.getElementById("check").disabled = true;
    document.getElementById("call").disabled = true;
    document.getElementById("fold").disabled = true;
    document.getElementById("bet").disabled = true;
    document.getElementById("slider").disabled = true;
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
    setLastAction(data.player + " Bet " + data.amount);
    setAction({player: data.player, action: "bet", amount: data.amount});
}

//data fields: player, amount
function check(data){
    setLastAction(data.player + " check " + data.amount);
    setAction({player: data.player, action: "check"});
}

//data fields: player, amount
function call(data) {
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


//Player's Turn
function setPlayerTurn(currentBet){
    currentbet = currentBet;
    if(currentBet != 0){
        document.getElementById("check").disabled = true;
        document.getElementById("call").disabled = false;
        document.getElementById("fold").disabled = false;
        document.getElementById("bet").disabled = false;
        document.getElementById("slider").disabled = false;
    } else if(currentBet >= parseInt(document.getElementById("playeramount").innerHTML)){
        document.getElementById("check").disabled = true;
        document.getElementById("call").disabled = false;
        document.getElementById("fold").disabled = false;
        document.getElementById("bet").disabled = true;
        document.getElementById("slider").disabled = true;
    }else{
        document.getElementById("bet").disabled = false;
        document.getElementById("check").disabled = false;
        document.getElementById("call").disabled = true;
        document.getElementById("fold").disabled = false;
        document.getElementById("slider").disabled = false;
    }

    if (document.getElementById("slider").value / 100 * parseInt(document.getElementById("playeramount").innerHTML) < currentbet + 25) {
        document.getElementById("rangevalue").value = currentbet + 25;
    } else {
        document.getElementById("rangevalue").value = document.getElementById("slider").value / 100 * parseInt(document.getElementById("playeramount").innerHTML);
    }


}

function setBetTurn(data){
    if(data.player == player){
        setPlayerTurn(data.amount);
        document.getElementById("turn").innerHTML = "<strong> YOUR TURN! </strong>";

    }else{
        document.getElementById('turn').innerHTML = "<strong>" + data.player + "'s Turn" + "</strong>";
        disableButtons();
    }
}


function setDealer(data){
    switch(data){
        case player:
            document.getElementById('player-blind').innerHTML = "Dealer";
            document.getElementById('right-blind').hidden = false;
            break;
        case topPlayer:
            document.getElementById('top-blind').innerHTML = "Dealer";
            document.getElementById('top-blind').hidden = false;
            break;
        case leftPlayer:
            document.getElementById('left-blind').innerHTML = "Dealer";
            document.getElementById('left-blind').hidden = false;
            break;
        case rightPlayer:
            document.getElementById('right-blind').innerHTML = "Dealer";
            document.getElementById('right-blind').hidden = false;
            break;
    }
}

function setSmallBlind(data){
    switch(data){
        case player:
            document.getElementById('player-blind').innerHTML = "Small Blind";
            document.getElementById('player-blind').hidden = false;
            break;
        case topPlayer:
            document.getElementById('top-blind').innerHTML = "Small Blind";
            document.getElementById('top-blind').hidden = false;
            break;
        case leftPlayer:
            document.getElementById('left-blind').innerHTML = "Small Blind";
            document.getElementById('left-blind').hidden = false;
            break;
        case rightPlayer:
            document.getElementById('right-blind').innerHTML = "Small Blind";
            document.getElementById('right-blind').hidden = false;
            break;
    }
}

function setBigBlind(data){
    switch(data){
        case player:
            document.getElementById('player-blind').innerText = "Big Blind";
            document.getElementById('player-blind').hidden = false;
            break;
        case topPlayer:
            document.getElementById('top-blind').innerText = "Big Blind";
            document.getElementById('top-blind').hidden = false;
            break;
        case leftPlayer:
            document.getElementById('left-blind').innerText = "Big Blind";
            document.getElementById('left-blind').hidden = false;
            break;
        case rightPlayer:
            document.getElementById('right-blind').innerText = "Big Blind";
            document.getElementById('right-blind').hidden = false;
            break;
    }
}

function hideBlinds(){
            document.getElementById('player-blind').hidden =  true;
            document.getElementById('top-blind').hidden = true ;
            document.getElementById('left-blind').hidden = true;
            document.getElementById('right-blind').hidden = true;

}

function setRoles(data){
    hideBlinds();
    setDealer(data.dealer);
    setBigBlind(data.bigBlind);
    setSmallBlind(data.smallBlind);
}


function users(data){
    console.log(data);
    if(data.player == player){
        playerIndex = data.seat;
    }
    for(let i = 0; i < data.allPlayers.length; i++){
        console.log(data.allPlayers[i] + " " + data.seat);
        addPlayer({name: data.allPlayers[i], index: i});
    }

}




function flop(data){
    setFlopImagesImages({onevalue: data.onevalue, twovalue: data.twovalue, threevalue: data.threevalue, onesuit: data.onesuit, twosuit: data.twosuit, threesuit: data.threesuit});
    setBetTurn({player: data.player});
}

function turn(data){
    setTurnImages({value: data.value, suit: data.suit});
    setBetTurn({player: data.player});
}

function river(data){
    setRiverImages({value: data.value, suit: data.suit});
    setBetTurn({player: data.player});
}

function showCards(data){
    for(let player in data){
        showPlayerCards({leftsuit: player.leftsuit, leftvalue: player.leftvalue, rightsuit: player.rightsuit, rightvalue: rightvalue, player: player.name});
    }
}

function blinds(data){
    setPlayerBank({player: data.smallBlind, amount: data.amount / 2});
    setPlayerBank({player: data.bigBlind, amount: data.amount});
}

function winner(data){
    setPlayerBank({player: data.player, amount: (data.amount)});
}

function deal(data){
    if(data.player == player){
        showPlayerCards({player: player, leftvalue: data.leftvalue, rightvalue: data.rightvalue, leftsuit: data.leftsuit, rightsuit: data.rightsuit});
    }
}

//socket.io functions
$(function () {
    socket.on(table, function(data){
        switch(data.action){
            case "fold":fold(data);                 break;
            case "bet": bet(data);                  break;
            case "call": call(data);                break;
            case "new user": users(data);           break;
            case "disconnect": removePlayer(data);  break;
            case "check": check(data);              break;
            case "show cards": showCards(data);     break;
            case "winner": winner(data);            break;
            case "river": river(data);              break;
            case "turn": turn(data);                break;
            case "flop": flop(data);                break;
            case "pot amount": setPotAmount(data);  break;
            case "blinds" : blinds(data);           break;
            case "deal" : deal(data);               break;
            case "setTurn": setBetTurn(data);       break;
        }
    });
});