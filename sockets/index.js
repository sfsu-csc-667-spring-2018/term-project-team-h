const socket_io = require('socket.io');
const cookieParser = require('cookie-parser');
const users = require('../db/users');
const game_users = require('../db/game_users');
const games = require('../db/game');
const cards = require('../db/game_cards');

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
        let seat, players = [];
        games.getSeatsTaken(data.table).then(result =>{
            seat = getEmptySeat(result.seats_taken);
            users.getUserId(data.player).then(result => {
                game_users.newplayer(parseInt(data.table) , result.user_id).then(result => {
                    game_users.getAllPlayers(data.table).then(result => {
                        for(let i = 0; i < result.length; i++){
                            users.getUserName(result[i].user_id).then(result => {
                                players.push(result.user_name);
                                console.log('nfjhhf',players);
                            }).catch((error) => {
                                console.log(error);
                            });
                        }
                        setTimeout(function(){
                            io.emit(data.table, {player: data.player, action: 'new user', seat: seat, allPlayers: players});

                        }, 5000);
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((error) => {
                    console.log(error);
                });
                game_users.setseatnumber(seat, result.user_id).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
            let updatedSeats = result.seats_taken + " " + seat;
            games.updateSeatsTaken(updatedSeats, data.table).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });





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

function getEmptySeat(data){
    let seats = data.split(' ');
    for(let i = 1; i < 5; i++){
        if(!seats.includes(i)){
            return i;
        }
    }
}
module.exports = io;