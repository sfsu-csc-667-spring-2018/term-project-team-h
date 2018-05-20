const socket_io = require('socket.io');
const cookieParser = require('cookie-parser');

const io = socket_io();

//key: table number value: array of players

io.on('connection', function(socket){
	console.log('A User Connected');

	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg)
	});


	socket.on('disconnect', function(data){
		//remove player from table
		console.log('A User Disconnected');
		io.emit(data.table, {player: data.player, action: "disconnect"});
	});


	socket.on('bet', function(data){
		//TODO: update pot
		//		update nextPlayer
		//		send card if necessary
		let nextPlayer, potAmount;
		io.emit(data.table, {action: "bet", amount: data.amount, player: data.player, nextPlayer: nextPlayer, potAmount: potAmount});
	});

	socket.on('fold', function (data){
		//TODO: take player out of rotation
		//		check if there is a winner, award the winner, then reset the game
		//		update player Turn
		//		update pot if necessary
		//
        io.emit(data.table, {action: "fold", player: data.player});

    });

	socket.on('call', function(data){
		/*TODO: update nextPlayer
		* 		update pot
		* 		update player's bank
		* 		check if a card needs to be sent
		* */
		let nextPlayer;
        io.emit(data.table, {action: "call", player: data.player, amount: data.amount, nextPlayer: nextPlayer, potAmount: potAmount});
	});

	socket.on('new player', function(data){
		//TODO: add player to db
		//		get other Players in table
		players.push(data.player);
		let value = parseInt(Math.random()*13) + 1;
		io.emit(data.table, {player: data.player, action: 'new user', seat: num++, allPlayers: players});
		io.emit(data.table, {player: data.player, action: 'deal', leftvalue: value, leftsuit: "spades", rightvalue: value, rightsuit: "diamonds"});
	});

	socket.on('check', function(data){
		//update player
		io.emit(data.table, {player: player, action: 'check'});
	});



});





function getCards(data) {
    let done = false, card, dealtCards = data.dealtCards, count = 0, result = [];
    while(!done) {
        card = parseInt(Math.random() * 52) + 1;
        if (!(dealtCards.includes(card))) {
            dealtCards.push(card);
            result.push(card);
            count++;
        }
        if (count === data.numberOfCards) {
            done = true;
        }

        //TODO: update dealt cards in db
    }
    return result;
}

function convertSuit(data){
    let result;
    switch(data){
        case 1: result = "Spades";break;
        case 2: result = "Clubs";break;
        case 3: result = "Diamonds";break;
        case 0: result = "Hearts";break;
    }
    return result;
}

function setFlop(data) {
    const cards = getCards({numberOfCards: 3, dealtCards: data.dealtCards});
    let flop = {
        onevalue: cards[0] % 13 + 1,
        twovalue: cards[1] % 13 + 1,
        threevalue: cards[2] % 13 + 1,
        onesuit: convertSuit(parseInt((cards[0] - 1) / 13)),
        twosuit: convertSuit(parseInt((cards[1] - 1) / 13)),
        threesuit: convertSuit(parseInt((cards[2] - 1) / 13)),
        player: data.player,
        action: "flop"
    };
    //TODO: update community and dealt cards in db
    io.emit(data.table, flop);
}

function setTurn(data) {
    const cards = getCards({numberOfCards: 1, dealtCards: data.dealtCards});
    let turn = {
        value: cards[0] % 13 + 1,
        suit: convertSuit(parseInt((cards[0] - 1) / 13)),
        player: data.player,
        action: "turn"
    };
    //TODO: update community and dealt cards in db
    io.emit(data.table, turn);
}

function setRiver(data) {
    const cards = getCards({numberOfCards: 1, dealtCards: data.dealtCards});
    let river = {
        value: cards[0] % 13 + 1,
        suit: convertSuit(parseInt((cards[0] - 1) / 13)),
        player: data.player,
        action: "river"
    };
    //TODO: update community and dealt cards in db
    io.emit(data.table, river);
}

function dealCards(data){
    let cards;
    for(let i = 0; i < data.players.length; i++){
        cards = getCards({numberOfCards: 2, dealtCards: data.dealtCards});
        cards  = {
            leftvalue: cards[0] % 13 + 1,
            rightvalue: cards[1] % 13 + 1,
            leftsuit: convertSuit(parseInt((cards[0] - 1) / 13)),
            rightsuit: convertSuit(parseInt((cards[1] - 1) / 13)),
            action: "deal",
            player: data.player[i]
        };
        //TODO: update player cards and dealt cards in db
        io.emit(data.table, cards);
    }
}
module.exports = io;