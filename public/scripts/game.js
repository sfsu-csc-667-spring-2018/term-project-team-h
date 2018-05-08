var player = "hello", leftPlayer = "yes", rightPlayer = "fuck", topPlayer = "shit";
var currentbet = 0, blind = 0, bigblind = "";


$(document).ready(function(){
    setPlayerTurn(100);

    document.getElementById("bet").addEventListener("click", function(){
        var amount = document.getElementById("rangevalue").value;
        if(amount <= parseInt(document.getElementById("playeramount").innerHTML)){
            bet({player: player, amount: amount});
        }
    });
    document.getElementById("fold").addEventListener("click", function(){
        setFlop({onevalue: 3, twovalue: 9,threevalue: 10, onesuit: "diamonds", threesuit: "diamonds", twosuit: "diamonds"});
    });
    document.getElementById("check").addEventListener("click", function(){
        setTurn({value: 3, suit: "diamonds"});
    });
    document.getElementById("call").addEventListener("click", function(){
        setRiver({value: 3, suit: "diamonds"});
    });


    document.getElementById("slider").addEventListener("change", function() {
        if (document.getElementById("slider").value / 100 * parseInt(document.getElementById("playeramount").innerHTML) < currentbet + 25) {
            document.getElementById("rangevalue").value = currentbet + 25;
        } else {
            document.getElementById("rangevalue").value = document.getElementById("slider").value / 100 * parseInt(document.getElementById("playeramount").innerHTML);
        }
    });
});

function updateBoard(data){

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

function bet(data){
    setPlayerBank({player: data.player, amount: ( -1 * data.amount ) });
    setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + parseInt(data.amount));
    setLastAction(data.player + " Bet " + data.amount);
    setAction({player: data.player, action: "bet", amount: data.amount});
}

function call(data) {
    setPlayerBank({player: data.player, amount: (-1 * data.amount)});
    setPotAmount(parseInt(document.getElementById("potamount").innerHTML) + data.amount);
    setLastAction(data.player + " Called " + data.amount);
    setAction({player: data.player, action: "called", amount: data.amount});
}

function fold(data){
    setLastAction(data.player + " Folded");
    switch(data.player){
        case player:
            document.getElementById("player-left-card").style.visibility= "hidden";
            document.getElementById("player-right-card").style.visibility= "hidden";
        case topPlayer:
            document.getElementById("opponents-top-cards").children[0].style.visibility= "hidden";
            document.getElementById("opponents-top-cards").children[1].style.visibility= "hidden";
        case leftPlayer:
            document.getElementById("opponents-left-cards").children[0].style.visibility= "hidden";
            document.getElementById("opponents-left-cards").children[1].style.visibility= "hidden";
        case rightPlayer:
            document.getElementById("opponents-right-cards").children[0].style.visibility= "hidden";
            document.getElementById("opponents-right-cards").children[1].style.visibility= "hidden";
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